import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, getPostComments } from "@/api";

function Comment({ postId }) {
  const [commentAdd, setCommentAdd] = useState("");
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", "postId"],
    queryFn: () => {
      return getPostComments(postId);
    },
  });

  const {
    data: dataFromCommentAdd,
    error: mutationError,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: () => {
      return addComment(postId, {
        content: commentAdd,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", "postId"] });
      setCommentAdd(""); // Clear the form after submission
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  if (isPending) return <h1>Pending...</h1>;
  if (mutationError) return <h1>Error: {mutationError.message}</h1>;

  return (
    <div className="mt-4">
      {comments.data.data.comments.map((comment) => (
        <div key={comment._id} className="mb-4">
          <b>{`${comment.author.firstName} ${comment.author.lastName}`}</b>{" "}
          <br /> {comment.content}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(commentAdd);
        }}>
        <input
          type="text"
          value={commentAdd}
          onChange={(e) => setCommentAdd(e.target.value)}
          className="mr-2 border rounded p-2 w-[30rem]"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default Comment;
