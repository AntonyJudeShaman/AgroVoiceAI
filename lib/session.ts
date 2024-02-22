import { getServerSession } from "next-auth/next"

import { auth } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(auth)

  return session?.user
}
