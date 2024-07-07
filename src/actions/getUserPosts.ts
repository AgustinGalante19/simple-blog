"use server"

import client from "@/lib/prisma"
import PostWithUser from "@/types/PostWithUser"
import { Post } from "@prisma/client"

export default async function getUserPosts(
  username: string
): Promise<PostWithUser[]> {
  const userPosts = await client.post.findMany({
    where: {
      User: {
        username,
      },
    },
    include: {
      User: true,
    },
  })
  return userPosts
}
