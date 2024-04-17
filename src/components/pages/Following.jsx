import { useDispatch, useSelector } from "react-redux";
import { getFollowingList } from "@/api";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Following() {
  const userData = useSelector((state) => state.auth.userData.data);
  console.log("userData from following", userData);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const {
    data: following,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getFollowingList(userData.username),
  });

  if (isLoading) return <h1> Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Following</h1>
        <Link className="bg-blue-800 p-2 rounded-md text-white" to="/followers">
          Followers
        </Link>
      </div>

      {console.log(following)}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {following?.data?.data?.following &&
          following.data.data.following.map((follower, index) => (
            <Link
              to={`/profile/${follower.username}`}
              key={follower._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-96">
              <img
                src={follower.avatar.url || "https://via.placeholder.com/200"}
                alt="Avatar"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {follower.username}
                </h2>
                <p className="text-sm text-gray-600">{follower.profile.bio}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Location: {follower.profile.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {follower.email}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Following;
