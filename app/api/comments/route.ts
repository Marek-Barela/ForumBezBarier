import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { content, postId, author, userId } = await req.json();

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
        author,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Nie można dodać komentarza" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
