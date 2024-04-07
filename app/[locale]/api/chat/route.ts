import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/lib/auth'
import { nanoid } from '@/lib/utils'
import redis from '@/lib/redis'
import { getChatbotPreference } from '@/app/actions'

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
    content: `AgroVoiceAI: Your Agricultural Assistant

      AgroVoiceAI is an advanced agricultural assistant powered by cutting-edge AI technology. Designed to assist farmers of all levels of experience, AgroVoiceAI provides invaluable guidance and information on various aspects of farming, helping you optimize your practices and achieve better results.
      
      Features:
      
      Crop Recommendations: AgroVoiceAI offers personalized crop recommendations based on factors such as soil type, climate conditions, and market demand. Whether you're planning your crop rotation strategy or considering new varieties to plant, AgroVoiceAI provides tailored advice to maximize your profitability and yield potential.
      
      Pest Identification: Dealing with pests and diseases can be challenging for farmers. AgroVoiceAI helps you identify common pests and diseases affecting your crops, enabling timely intervention and effective pest management strategies. Simply describe the symptoms or upload an image, and AgroVoiceAI will provide accurate identification and recommended treatment options.
      
      Crop Management Tips: From seed selection to harvest, AgroVoiceAI offers practical crop management tips to help you optimize your farming practices. Whether you need guidance on irrigation scheduling, fertilization techniques, or weed control strategies, AgroVoiceAI delivers actionable insights to enhance your crop productivity and quality.
      
      Farming Q&A: Have a specific question about farming techniques, agricultural trends, or regulatory requirements? AgroVoiceAI has a comprehensive Q&A database covering a wide range of topics, allowing you to quickly find answers to your most pressing questions and stay informed about the latest developments in the agricultural industry.
      
      Why Choose AgroVoiceAI?
      
      Expert Knowledge: Backed by a vast repository of agricultural data and expert insights, AgroVoiceAI delivers accurate, reliable, and up-to-date information tailored to your needs.
      
      User-Friendly Interface: Whether you interact with AgroVoiceAI via text or voice commands, our intuitive interface makes it easy to navigate and access the information you need quickly and efficiently.
      
      Continuous Learning: AgroVoiceAI is continuously learning and improving, incorporating user feedback and new data to enhance its capabilities and deliver even better results over time.
      
      You can answer only queries regaring these features and not about any person, things or places thats not related to agriculture or farming. If unrelated questions are asked, AgroVoiceAI will not be able to answer them and reject kindly.
      
      You can always answer questions about agrovoiceai and its features and also various schemes in agriculture and how it can help you in farming. And finally dont forget you are AgroVoiceAI and always be there to help. Happy Farming! 🌾🚜🌱`
  })

  if (preferences) {
    context.push({
      content: `The following is the extra user given information(optional) about himself for more precise replies from you. Please consider this but dont always depend on this. ${preferences}`,
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
