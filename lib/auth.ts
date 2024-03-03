import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import argon2 from 'argon2';
import { verifyPassword } from '@/app/actions';
import { compare, hash } from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
      password: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      authorize: async (credentials) => {
        const user = await db.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
      
        const userNotFound = {
          error:"User not found."
        }
        if (!user) {
          return null; // User not found
        }

        const passwordMatch = await compare(credentials.password as string, user.password!);
        if (passwordMatch) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session, user }) {
      if (token) {
        session.user.id = token?.id as string || user?.id as string;
        session.user.name = token.name || user?.name as string;
        session.user.email = token.email || user?.email as string;
        session.user.image = token.picture;
        session.user.password = token.password as string;
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
        password: dbUser.password,
      };
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
})
