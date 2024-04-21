"use client";

import { MessageSquare } from "lucide-react";

import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, Comment } from "@prisma/client";
import { routes } from "@/routing";

export interface PostProps extends Post {
  comments: Comment[];
}

export function PostItem({ id, title, content, comments, author }: PostProps) {
  const router = useRouter();

  return (
    <button>
      <Card
        className="cursor-pointer text-left"
        onClick={() => router.push(routes.post + `/${id}`)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardTitle className="text-sm mt-2">Autor - {author}</CardTitle>
          <CardDescription className="py-4 text-balance leading-relaxed">
            {content}
          </CardDescription>
        </CardHeader>
        <div className="bg-gray-50 px-4 py-2 flex w-full">
          <span className="text-gray-500 hover:text-gray-600 flex items-center gap-3">
            <MessageSquare className="h-6 w-6" />
            <span>{comments?.length} komentarzy</span>
          </span>
        </div>
      </Card>
    </button>
  );
}
