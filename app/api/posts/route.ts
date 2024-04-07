import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

const GET = async () => {
  const posts = await prisma.post.findMany({
    include: { comments: true },
  });

  return NextResponse.json({
    posts,
  });
};

const POST = async (req: NextRequest) => {
  const { userId } = auth();

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId,
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
