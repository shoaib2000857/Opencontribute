"use client";

import { useState, useEffect } from "react";

export default function CommentsSection({ projectId }: { projectId: number }) {
  const [comments, setComments] = useState<any[]>([]); // Initialize as an empty array
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/comments`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setComments(data); // Ensure the response is an array
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchComments();
  }, [projectId]);

  const handleAddComment = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (!res.ok) {
        throw new Error("Failed to add comment");
      }

      setNewComment("");
      const updatedComments = await res.json();
      if (Array.isArray(updatedComments)) {
        setComments(updatedComments); // Refresh comments
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Collaborate & Discuss</h2>
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded p-2"
          rows={3}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-foreground text-background rounded px-4 py-2 hover:bg-gray-700"
        >
          Add Comment
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}