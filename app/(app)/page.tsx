"use client";
import { PlusCircle, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Posts {
  posts: {
    id: number;
    title: string;
    content: string;
    comments: [];
  }[];
}

export default function Dashboard() {
  const fetchPosts = (): Promise<Posts> => fetch("/api/posts").then(res => res.json());
  const { data, isLoading, error } = useQuery<Posts>("posts", fetchPosts);

  const route = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={() => route.push("/new-post")}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Dodaj Nowy Post
                </span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {data?.posts.map(({ id, ...rest }) => {
              return <Post key={id} postId={id} {...rest} />;
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

interface PostProps {
  postId: number;
  title: string;
  content: string;
  comments: [];
}

const Post = ({ postId, title, content, comments }: PostProps) => {
  const router = useRouter();

  return (
    <button>
      <Card
        className="cursor-pointer text-left"
        onClick={() => router.push(`/post/${postId}`)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
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
};
