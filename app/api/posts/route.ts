import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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
  try {
    const body = await req.json();
    const { title, content, userId, author } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId,
        author,
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
