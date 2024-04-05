"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "react-query";

interface NewPost {
  title: string;
  content: string;
}

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, isLoading } = useMutation(async (newPost: NewPost) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    return await res.json();
  });

  const handleSubmit = () => {
    mutate({ title, content });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowy Post</CardTitle>
        <CardDescription>Opisz swój problem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nazwa</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nazwa Posta"
              type="text"
              className="w-full"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Treść</Label>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="min-h-64"
              placeholder="Treść Posta"
            />
          </div>
        </div>
        <Button className="mt-4 w-full" onClick={handleSubmit} disabled={isLoading}>
          Zapisz
        </Button>
      </CardContent>
    </Card>
  );
}
