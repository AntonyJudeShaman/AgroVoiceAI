import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';

// export const runtime = 'edge'

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
  providers: [Google],
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
      };
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  pages: {
    signIn: '/sign-in',
  },
})
