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
        if (credentials) {
          const user = await db.user.findUnique({
            where: {
              userName: credentials.name as string
            }
          })

          console.log('after user check')
          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(
            (credentials.password as string) + 10
          )
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-512',
            saltedPassword
          )
          const hashedPassword = await hashPassword(
            credentials.password as string
          )
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
        } else {
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
        session.user.id = token?.id as string
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

      console.log(user.id)

      return {
        id: user.id,
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
