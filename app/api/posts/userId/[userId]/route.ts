import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      include: {
        comments: true,
      },
    });

    if (posts.length === 0) {
      return new NextResponse(JSON.stringify({ posts: [] }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify({ posts: posts }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error fetching posts" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
