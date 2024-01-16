import client from "@/lib/prisma"
import { SavedPost } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string }
  }
): Promise<NextResponse<ApiResponse<SavedPost>>> {
  const posts = await client.savedPost.findMany({
    where: {
      userId: params.id,
    },
    include: {
      post: true,
    },
  })

  return NextResponse.json({ data: posts, error: [], result: "ok" })
}
