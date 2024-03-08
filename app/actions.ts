'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { type Chat } from '@/lib/types'

import redis from '@/lib/redis'
import { db } from '@/lib/db'

import argon2 from 'argon2'
import { compare } from 'bcrypt'

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = redis.pipeline()
    const chats: string[] = await redis.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}
export async function getUser() {
  const session = await auth()

  return session?.user
}

export async function verifyPassword(
  plaintextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    // console.log(plaintextPassword)
    // console.log(hashedPassword)
    const match = await compare(hashedPassword, plaintextPassword)
    return match
  } catch (error) {
    console.error('Error verifying password:', error)
    throw error
  }
}

export async function getCurrentUser() {
  const session = await auth()
  const user = await db.user.findFirst({
    where: {
      email: session?.user.email
    }
  })
  return user
}

export async function getUserId() {
  const session = await auth()

  return session?.user?.id
}

export async function getChatbotPreference() {
  const user = await getCurrentUser()

  return user?.chatbotPreference
}

export async function removeImage() {
  const id = await getUserId()

  if (!id) {
    return {
      error: 'Unauthorized'
    }
  }

  try {
    await db.user.update({
      where: {
        id: id
      },
      data: {
        image: null
      }
    })
  } catch (error) {
    return {
      error: 'Something went wrong'
    }
  }
  revalidateTag('user')
}

export async function deleteAccount() {
  const id = await getUserId()

  if (!id) {
    return {
      error: 'Unauthorized'
    }
  }
  try {
    await db.user.delete({
      where: {
        id: id
      }
    })

    const userAccounts = await db.account.findMany({
      where: {
        userId: id
      }
    })

    for (const account of userAccounts) {
      await db.account.delete({
        where: {
          id: account.id
        }
      })
    }

    // return redirect('/sign-in')
  } catch (error) {
    return {
      error: 'Something went wrong'
    }
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await redis.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  const uid = String(await redis.hget(`chat:${id}`, 'userId'))

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  await redis.del(`chat:${id}`)
  await redis.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  revalidatePath('/chat')
  return revalidatePath('/chat')
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await redis.zrange(
    `user:chat:${session.user.id}`,
    0,
    -1
  )
  if (!chats.length) {
    return redirect('/chat')
  }
  const pipeline = redis.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.id}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/chat')
  return redirect('/chat')
}

export async function getSharedChat(id: string) {
  const chat = await redis.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await redis.hgetall<Chat>(`chat:${id}`)

  if (!chat || chat.userId !== session.user.id) {
    return {
      error: 'Something went wrong'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await redis.hmset(`chat:${chat.id}`, payload)

  return payload
}
