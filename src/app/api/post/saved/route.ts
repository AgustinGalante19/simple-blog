export const dynamic = "force-dynamic"

import client from "@/lib/prisma"
import { NextResponse } from "next/server"

interface SavedPostResponse {
  id: string
  postId: string
  userId: string
}

export async function GET(): Promise<
  NextResponse<ApiResponse<SavedPostResponse>>
> {
  try {
    const savedPosts = await client.savedPost.findMany()

    return NextResponse.json({ data: savedPosts, error: [], result: "ok" })
  } catch (err) {
    return NextResponse.json({
      data: [],
      error: ["Something went wrong. Try later..."],
      result: "error",
    })
  }
}

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<boolean>>> {
  try {
    const body = await req.json()
    await client.savedPost.create({
      data: {
        postId: body.postId,
        userId: body.userId,
      },
    })

    return NextResponse.json({ data: [true], error: [], result: "ok" })
  } catch (err) {
    return NextResponse.json({
      data: [],
      error: ["Something went wrong, try later..."],
      result: "error",
    })
  }
}

export async function DELETE(
  req: Request
): Promise<NextResponse<ApiResponse<boolean>>> {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    const postId = searchParams.get("postId")
    if (userId && postId) {
      await client.savedPost.deleteMany({
        where: {
          postId: {
            equals: postId,
          },
          AND: {
            userId: {
              equals: userId,
            },
          },
        },
      })

      return NextResponse.json({ data: [true], error: [], result: "ok" })
    }

    return NextResponse.json(
      {
        data: [false],
        error: ["User Id and Post Id must be provided on the request"],
        result: "error",
      },
      { status: 400 }
    )
  } catch (err) {
    return NextResponse.json({
      data: [],
      error: ["Something went wrong, try later..."],
      result: "error",
    })
  }
}
