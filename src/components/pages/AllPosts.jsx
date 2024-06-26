import React, { useState } from "react";
import PostBox from "../Posts";
import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "@/api";
import Comment from "../smallComps/Comment";
import Like from "../smallComps/Like";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CreatePostCopied from "../CreatePostCopied";
import CreatePost from "../CreatePost";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "../ui/button";
import CarouselDemo from "../testComponents/CarouselDemo";
import DrawerDemo from "../testComponents/DrawerDemo";

function Home() {
  const dispatch = useDispatch();
  const params = useParams();
  const [commentVisible, setCommentVisible] = useState({});
  const [addPost, setAddPost] = useState(false);

  const handleLike = (postId) => {
    refetch();
  };

  function getWhosePost() {
    if (!params.username) {
      return getPosts(1, 10);
    } else {
      return getPostsByUsername(params.username);
    }
  }

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getWhosePost(1, 20),
  });
  const togglePostComment = () => {
    setAddPost(!addPost);
  };

  const toggleComment = (postId) => {
    setCommentVisible({
      ...commentVisible,
      [postId]: !commentVisible[postId],
    });
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-red-700">{error.message}</h1>;

  return (
    <div className="place-items-center mx-auto">
      <div className="flex justify-center my-6 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={togglePostComment}
              className="bg-blue-500 text-white"
              variant="outline">
              {addPost ? "Close Post Form" : "Add a new post"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <CreatePostCopied />
          </PopoverContent>
        </Popover>
      </div>
      {/* 
      <DrawerDemo /> */}

      {posts.data.data.posts.map((post) => (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4" key={post._id}>
          <Link
            to={`/profile/${post.author.account.username}`}
            className="flex items-start mb-2">
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
          </Link>
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
                    className="w-90 h-60 rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
            {console.log(post.images)}

            <DrawerDemo images={post.images} />
          </div>
          <div className="flex items-center mb-2 mx-5">
            <div className="mr-6">
              <Like
                type="post"
                key={post._id}
                id={post._id}
                likedStatus={post.isLiked}
                likeCount={post.likes}
                onLike={() => handleLike(post._id)}
              />
            </div>
            <div>
              <span
                className="text-indigo-600 cursor-pointer"
                onClick={() => toggleComment(post._id)}>
                {post.comments} Comments
              </span>
            </div>
          </div>
          <hr />
          {commentVisible[post._id] && <Comment postId={post._id} />}
        </div>
      ))}
    </div>
  );
}

export default Home;
