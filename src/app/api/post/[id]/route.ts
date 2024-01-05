import client from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse<ApiResponse<Post>>> {
  const post = await client.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      User: {
        select: {
          username: true,
          name: true,
          lastname: true,
        },
      },
    },
  });
  if (post) {
    return NextResponse.json({ data: [post], error: [], result: "ok" });
  }

  return NextResponse.json({
    data: [],
    error: ["Post not found"],
    result: "error",
  });
}
