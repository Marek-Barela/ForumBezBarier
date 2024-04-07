"use client";
import { useMutation, useQuery } from "react-query";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PostPageProps {
  params: {
    postId: string;
  };
}

interface Comment {
  id: number;
  content: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

export default function PostPage({ params: { postId } }: PostPageProps) {
  const router = useRouter();

  const fetchPost = (postId: string): Promise<Post> =>
    fetch(`/api/posts/${postId}`).then(res => res.json());

  const { data, isLoading, error, refetch } = useQuery<Post, Error>(
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
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => router.push("/")}>
        <ArrowLeftCircle width={30} height={30} />
        <p>Powrót</p>
      </div>
      <div className="py-2">
        <h2 className="text-3xl mt-2 mb-10 font-bold">{title}</h2>
        <p className="text-gray-700 mb-10">{content}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-1 text-gray-500 text-sm">
            <span>{comments.length} komentarze</span>
          </div>
        </div>
      </div>

      <AddComment postId={postId} refetch={refetch} />

      <div className="grid auto-rows-max items-start gap-2 mt-2">
        {comments.map(data => (
          <Comment key={data.id} content={data.content} />
        ))}
      </div>
    </article>
  );
}

interface CommentProps {
  content: string;
}

const Comment = ({ content }: CommentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Komentarz</CardTitle>
        <CardDescription className="max-w-3xl text-balance leading-relaxed">
          {content}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

interface AddCommentProps {
  postId: string;
  refetch: () => void;
}

interface NewComment {
  content: string;
  postId: string;
}

const AddComment = ({ postId, refetch }: AddCommentProps) => {
  const [comment, setComment] = useState("");

  const { mutate, isLoading } = useMutation(async (newComment: NewComment) => {
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
