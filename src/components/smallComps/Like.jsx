import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { likeOrUnlikePost, likeOrUnlikeComment } from "@/api";
import LikedNot from "./icons/LikedNot";
// import "liked.svg"

function Like({ type, id, likedStatus, likeCount, onLike }) {
  const [buttonClicked, setbuttonClicked] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: likeData,
    error,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: async () => {
      return await likeOrUnlikePost(id).then(() => {
        onLike(id);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeData", "postId"] });
    },
  });

  if (likeData) {
    likedStatus = likeData.data.data.isLiked;
  }

  let likeMsg;
  if (likedStatus) {
    if (likeCount == 1) {
      likeMsg = `You`;
    } else {
      likeMsg = `You and ${likeCount - 1} others`;
    }
  } else {
    likeMsg = `${likeCount}`;
  }

  if (isPending) return <h1>Pending...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <div>
      {/* {console.log(likeData)} */}
      <span className="text-indigo-600">{likeMsg} </span>
      <button
        className="cursor-pointer text-blue-600 p-2 rounded-sm"
        onClick={() => {
          console.log("Hello");
          return mutate();
        }}>
        {/* {likedStatus ? "liked" : "like"} */}
        <LikedNot likedStatus={likedStatus} />
      </button>
    </div>
  );
}

export default Like;
