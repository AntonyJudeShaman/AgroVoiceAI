import { PineconeClient } from '@pinecone-database/pinecone'

let pineconeClient = null

export const getPineconeClient = async () => {
  if (pineconeClient) {
    return pineconeClient
  }
  pineconeClient = new PineconeClient()

  await pineconeClient.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT
  })

  return pineconeClient
}
