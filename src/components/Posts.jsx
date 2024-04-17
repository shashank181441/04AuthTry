import React from "react";
import Comment from "./smallComps/Comment";
import Like from "./smallComps/Like";

function PostBox({ post, toggleComment, commentVisible }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex item-start mb-2">
        <img
          src={
            post.author.account.avatar.url ||
            post.author.account.avatar.localPath?.slice(6)
          }
          alt={`${post.author.firstName}'s Profile`}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="items-start">
          <p className="text-indigo-600 font-bold left-1">
            {post.author.firstName} {post.author.lastName}
          </p>
          <p className="text-gray-500">{post.author.bio}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex flex-wrap -mx-2 mb-4">
        {post.images.map((image, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2 mb-2">
            <div className="image-container">
              <img
                src={image.url || image.localPath?.slice(6)}
                loading="lazy"
                alt={`Post Image ${index}`}
                className="w-full h-60 rounded-lg object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mb-2 mx-5">
        <div className="mr-6">
          <Like
            type="post"
            id={post._id}
            likedStatus={post.isLiked}
            likeCount={post.likes}
            // onClick={setRefresh(!refresh)}
          />
        </div>
        <div>
          <span
            className="text-indigo-600"
            onClick={() => toggleComment(post._id)}>
            {post.comments} <button>Comment</button>
          </span>
        </div>
      </div>
      <hr />
      {commentVisible[post._id] && <Comment postId={post._id} />}
    </div>
  );
}

export default PostBox;
