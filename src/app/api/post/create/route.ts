import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<boolean>>> {
  const body = await req.json();
  await client.post.create({
    data: {
      content: body.data.content,
      title: body.data.title,
      userId: body.userData.id,
      tags: body.data.tags,
      headerImage: body.data.headerImage,
    },
  });
  return NextResponse.json({ data: [true], error: [], result: "ok" });
}
