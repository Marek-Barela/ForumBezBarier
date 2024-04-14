import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function DELETE(
  _: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const commentId = params.commentId;
  const { userId } = auth();

  if (!commentId) {
    return new NextResponse("Brakujący identyfikator komentarza", { status: 400 });
  }

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return new NextResponse("Komentarz nie istnieje", { status: 404 });
    }

    if (comment.userId !== userId) {
      return new NextResponse("Nieautoryzowany do usunięcia tego komentarza", {
        status: 403,
      });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return new NextResponse("Komentarz został usunięty", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Nie można usunąć komentarza" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
