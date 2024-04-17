import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { addComment, getPostComments } from "@/api";

function Comment({ postId }) {
  const [commentAdd, setCommentAdd] = useState("");
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
      console.log("hello");
      return addComment(postId, {
        content: commentAdd,
      });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  if (isPending) return <h1>Pending...</h1>;
  if (mutationError) return <h1>Error: {mutationError.message}</h1>;

  return (
    <div>
      {console.log(dataFromCommentAdd)}
      {comments.data.data.comments.map((comment) => (
        <div key={comment._id}>
          <b>{`${comment.author.firstName} ${comment.author.firstName}`}</b>{" "}
          <br /> {comment.content}{" "}
        </div>
      ))}
      <input
        type="text"
        value={commentAdd}
        onChange={(e) => setCommentAdd(e.target.value)}
      />
      <button
        className="bg-blue-600 p-4 rounded-md"
        onClick={() => mutate(commentAdd)}>
        Post Comment
      </button>
    </div>
  );
}

export default Comment;
