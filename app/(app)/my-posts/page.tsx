"use client";
import { PostItem, PostProps } from "@/components/features/PostItem";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";

interface Posts {
  posts: PostProps[];
}

export default function MyPostsPage() {
  const { userId } = useAuth();

  const fetchPosts = (id: string): Promise<Posts> =>
    fetch(`/api/posts/userId/${id}`).then(res => res.json());

  const { data, isLoading, error } = useQuery<Posts, Error>(
    ["post", userId],
    () => fetchPosts(userId || ""),
    {
      enabled: !!userId,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div className="flex flex-col gap-4 w-full">
      {data &&
        data?.posts.map(post => {
          return <PostItem key={post.id} {...post} />;
        })}
    </div>
  );
}
