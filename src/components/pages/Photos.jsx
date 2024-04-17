import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "@/api";
import { Link, useParams } from "react-router-dom";

function Photos() {
  const params = useParams();
  const [commentVisible, setCommentVisible] = useState({});
  const [refresh, setRefresh] = useState(true);

  console.log(params);

  function getWhosePost() {
    if (!params.username) {
      return getPosts();
    } else {
      return getPostsByUsername(params.username);
    }
  }

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", refresh],
    queryFn: () => getWhosePost(1, 20),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-700">{error.message}</h1>;

  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <div className="flex flex-wrap -mx-2 mb-4">
        {posts.data.data.posts.map((post) =>
          post.images.map((image, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mb-2">
              <Link to="/imageViewer" className="image-container">
                <img
                  src={image.url || image.localPath?.slice(6)}
                  loading="lazy"
                  alt={`Post Image ${index}`}
                  className="w-full h-60 rounded-lg object-cover"
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Photos;
