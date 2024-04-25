import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { geolocation } from '@vercel/edge'

import { auth } from '@/lib/auth'
import { getWeatherData, nanoid } from '@/lib/utils'
import redis from '@/lib/redis'
import { getChatbotPreference, getCurrentUser } from '@/app/actions'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const userRequestQueues: { [key: string]: number[] } = {}

export async function POST(req: Request) {
  const json = await req.json()
  const { messages } = json
  const userId = (await auth())?.user.id || nanoid()
  const preferences = await getChatbotPreference()

  if (!userRequestQueues[userId]) {
    userRequestQueues[userId] = []
  }

  const currentTime = Date.now()
  userRequestQueues[userId] = userRequestQueues[userId].filter(
    timestamp => currentTime - timestamp < 60000
  )

  if (userRequestQueues[userId].length >= 10) {
    return new Response('Too Many Requests', { status: 429 })
  }

  userRequestQueues[userId].push(currentTime)

  const context = []
  context.push({
    role: 'system',
    content: `AgroVoiceAI: Your Agricultural Assistant. AgroVoiceAI is an advanced agricultural assistant powered by cutting-edge AI technology. It provides guidance and information on various aspects of farming to optimize practices and achieve better results. Features include personalized crop recommendations, pest identification, crop management tips, and farming Q&A. Backed by expert knowledge, AgroVoiceAI delivers accurate and reliable information through an intuitive interface. It continuously learns and improves to provide better results over time. Happy Farming! 🌾🚜🌱`
  })

  if (preferences) {
    context.push({
      content: `The following is the extra user given information(optional) about himself for more precise replies from you. Please consider this but dont always depend on this, just take it as a context. ${preferences}`,
      role: 'system'
    })
  }

  const allMessages = messages.concat(context)

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: allMessages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}
