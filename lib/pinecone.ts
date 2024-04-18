import { PineconeClient } from '@pinecone-database/pinecone'

let pineconeClient: PineconeClient | null = null

export const getPineconeClient: () => Promise<PineconeClient> = async () => {
  if (pineconeClient) {
    return pineconeClient
  }
  pineconeClient = new PineconeClient()

  await pineconeClient.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!
  })

  return pineconeClient
}
