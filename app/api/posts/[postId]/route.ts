import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { postId: string } }) {
  const postId = params.postId;

  if (!postId) {
    return new NextResponse(JSON.stringify({ error: "Post ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
      include: { comments: true },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify(post), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error fetching post" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
