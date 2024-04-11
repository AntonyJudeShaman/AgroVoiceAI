import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: any) {
  // Check if the user is authenticated
  const user = await auth(request)
  console.log(user)
  if (!user) {
    // If user is not authenticated, return unauthorized response
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // Fetch data from the database (assuming you have a 'users' collection/table)
    const users = await db.user.findMany()

    // Return the fetched data
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
