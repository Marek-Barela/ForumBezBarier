import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import { Comment } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useMutation } from "react-query";

interface CommentItemProps extends Comment {
  refetch: () => void;
}

export const CommentItem = ({
  id,
  content,
  userId,
  author,
  refetch,
}: CommentItemProps) => {
  const auth = useAuth();

  const { mutate, isLoading } = useMutation(
    async (commentId: string) => {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the comment.");
      }

      return response.text();
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-md">Autor - {author}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="max-w-3xl text-balance leading-relaxed">
          {content}
        </CardDescription>
      </CardContent>

      {userId === auth.userId && (
        <Button
          className="absolute right-4 top-2/4 -translate-y-2/4 "
          aria-haspopup="true"
          size="icon"
          onClick={() => mutate(id)}
          disabled={isLoading}>
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Usuń Kometarz</span>
        </Button>
      )}
    </Card>
  );
};
