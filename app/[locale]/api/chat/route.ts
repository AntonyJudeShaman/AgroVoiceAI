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
  // const { city } = await geolocation(req)

  // const location = city

  // const weatherData = await getWeatherData('Chennai')

  // const weatherData = await fetch('/api/weather', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ location: 'Chennai' })
  // })

  // if (weatherData) {
  //   const weatherDataJson = await weatherData.json()
  //   messages.push({
  //     role: 'system',
  //     content: `If you are asked about the weather in a location you can use this, the weather in ${location} is ${weatherDataJson.list[0].weather[0].main} with a temperature of ${Math.round(weatherDataJson.main.temp - 273.15)}°C. Present this data in a good format.`
  //   })
  // }

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

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/c/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      if ((await auth())?.user.id) {
        await redis.hmset(`chat:${id}`, payload)
        await redis.zadd(`user:chat:${userId}`, {
          score: createdAt,
          member: `chat:${id}`
        })
      }
    }
  })

  return new StreamingTextResponse(stream)
}
