import client from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ApiResponse<Post>>> {
  try {
    const posts = await client.post.findMany({
      include: {
        User: true,
      },
    });

    return NextResponse.json({ data: posts, error: [], result: "ok" });
  } catch (err) {
    console.log("ERROR GETTING POSTS: ", err);
    return NextResponse.json({
      data: [],
      error: ["Cannot get posts. Try later..."],
      result: "error",
    });
  }
}
