import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async () => {
  const posts = await prisma.post.findMany();

  return NextResponse.json({
    posts,
  });
};

const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const { title, content } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Nie można dodać posta" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export { GET, POST };
