import { useDispatch, useSelector } from "react-redux";
import { getFollowersList } from "@/api";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Followers() {
  const userData = useSelector((state) => state.auth.userData.data);
  console.log("userData from followers", userData);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const {
    data: followers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getFollowersList(userData.username),
  });

  if (isLoading) return <h1> Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Followers</h1>
        <Link className="bg-blue-800 p-2 rounded-md text-white" to="/following">
          Following
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {followers?.data?.data?.followers &&
          followers.data.data.followers.map((follower, index) => (
            <Link
              to={`/profile/${follower.username}`}
              key={follower._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden">
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

export default Followers;
