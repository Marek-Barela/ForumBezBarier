import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { content, postId } = await req.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
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
