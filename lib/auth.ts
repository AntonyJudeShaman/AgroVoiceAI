import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from './db'
import { hashPassword } from './utils'

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
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Credentials({
      authorize: async credentials => {
        console.log('inside authorize')
        console.log(credentials)
        const user = await db.user.findUnique({
          where: {
            userName: credentials.name as string
          }
        })
        const hashedPassword = await hashPassword(
          credentials.password as string
        )
        if (user) {
          if (hashedPassword === user?.password) {
            console.log('User found', user)
            return user
          } else {
            console.error('Invalid credentials')
            return null
          }
        } else {
          console.error('User not found')
          return null
        }
      }
    })
  ],
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt',
    maxAge: 10 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  callbacks: {
    async session({ token, session }) {
      console.log('inside session', token)
      if (token) {
        session.user.id = token?.id as string
      }
      return session
    },
    async jwt({ token, user }) {
      console.log('inside jwt', token)
      const dbUser = await db.user.findFirst({
        where: {
          id: token.id as string
        }
      })

      if (!dbUser) {
        if (user) {
          token.id = token?.id
        }
        return token
      }
      console.log('before jwt', token)
      return {
        id: token.id
      }
    }
  },
  pages: {
    signIn: '/sign-in',
    error: '/error'
  }
})
