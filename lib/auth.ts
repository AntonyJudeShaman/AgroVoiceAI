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
  providers: [
    Google,
    Credentials({
      authorize: async credentials => {
        console.log('inside authorize')
        console.log(credentials)
        const user = await db.user.findUnique({
          where: {
            userName: credentials.name as string
          }
        })

        console.log('after user check')
        let hashedPassword = await hashPassword(credentials.password as string)

        for (let i = 1; i < 100; i++) {
          hashedPassword = await hashPassword(hashedPassword)
        }

        if (user) {
          if (hashedPassword === user?.password) {
            console.log('User found')
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
    async session({ token, session, user }) {
      if (token) {
        session.user.id = token?.id || (user?.id as any)
      }
      return session
    },
    async jwt({ token, user }) {
      console.log('inside jwt')
      const dbUser = await db.user.findFirst({
        where: {
          userName: token.name
        }
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        phone: dbUser.phone,
        age: dbUser.age,
        password: dbUser.password
      }
    }
  },
  pages: {
    signIn: '/sign-in',
    error: '/error'
  }
})
