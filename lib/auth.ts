import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import { compare } from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [Google,
  CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials:any) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await db.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password as string, user.password as string))) {
          throw new Error("Invalid username or password");
        }
        return user || null;
      },
    }),],
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token?.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
  
      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
  
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        phone: dbUser.phone,
        age: dbUser.age,
      };
    },
  },
  pages: {
    signIn: '/sign-in',
  },
})
