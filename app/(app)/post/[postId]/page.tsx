"use client";
import { useMutation, useQuery } from "react-query";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Post, Comment } from "@prisma/client";
import { CommentItem } from "./components/CommentItem";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface PostPageProps {
  params: {
    postId: string;
  };
}

interface PostsWithComments extends Post {
  comments: Comment[];
}

export default function PostPage({ params: { postId } }: PostPageProps) {
  const router = useRouter();
  const { user } = useUser();

  const fetchPost = (postId: string): Promise<PostsWithComments> =>
    fetch(`/api/posts/${postId}`).then(res => res.json());

  const { data, isLoading, error, refetch } = useQuery<PostsWithComments, Error>(
    ["post", postId],
    () => fetchPost(postId),
    {
      enabled: !!postId,
    }
  );

  if (isLoading) return <div>Loading post...</div>;
  if (error) return <div>Error fetching post: {error.message}</div>;
  if (!data) return <div>No post found.</div>;

  const { comments, content, title } = data;

  return (
    <article className="w-full mx-auto bg-white rounded-md overflow-hidden my-4">
      <div
        className="flex gap-2 items-center cursor-pointer mb-10"
        onClick={() => router.push("/")}>
        <ArrowLeftCircle width={30} height={30} />
        <p>Powrót</p>
      </div>
      <div className="py-2">
        <h2 className="text-3xl mt-2 mb-10 font-bold">{title}</h2>
        <p className="text-gray-700 mb-10">{content}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-1 text-gray-500 text-sm">
            <span>{comments?.length} komentarze</span>
          </div>
        </div>
      </div>

      {user ? (
        <AddComment postId={postId} refetch={refetch} />
      ) : (
        <Link href="/sign-in">
          <Button className="space-x-1 my-10">Aby dodać komentarz zaloguj się!</Button>
        </Link>
      )}

      <div className="grid auto-rows-max items-start gap-2 mt-2">
        {comments?.map(data => (
          <CommentItem key={data.id} refetch={refetch} {...data} />
        ))}
      </div>
    </article>
  );
}

interface AddCommentProps {
  postId: string;
  refetch: () => void;
}

const AddComment = ({ postId, refetch }: AddCommentProps) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");

  const { mutate, isLoading } = useMutation(async (newComment: Partial<Comment>) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    return await res.json();
  });

  const handleSubmit = () => {
    if (comment.trim()) {
      mutate(
        {
          content: comment,
          postId,
          author: user?.fullName || "",
          userId: user?.id,
        },
        {
          onSuccess() {
            refetch();
            setComment("");
          },
        }
      );
    }
  };

  return (
    <div className="mt-6">
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows={4}
        placeholder="Dodaj komentarz..."
        value={comment}
        onChange={e => setComment(e.target.value)}></textarea>
      <Button
        type="submit"
        className="mt-4 w-full"
        onClick={handleSubmit}
        disabled={isLoading}>
        Komentuj
      </Button>
    </div>
  );
};
