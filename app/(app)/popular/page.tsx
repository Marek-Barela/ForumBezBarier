"use client";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { PostItem, PostProps } from "@/components/features/PostItem";

interface Posts {
  posts: PostProps[];
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
            {data &&
              data?.posts.map(post => {
                return <PostItem key={post.id} {...post} />;
              })}
          </div>
        </main>
      </div>
    </div>
  );
}
