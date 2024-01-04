import client from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ApiResponse<Post>>> {
  const posts = await client.post.findMany({
    include: {
      User: true,
    },
  });

  return NextResponse.json({ data: posts, error: [], result: "ok" });
}
