import { useDispatch, useSelector } from "react-redux";
import { getProfile, getTheirProfile } from "@/api";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData.data);
  console.log("userData from followers", userData);
  const params = useParams();
  console.log("params", params.username);

  function getWhoseProfile() {
    if (!params.username) {
      return getProfile();
    } else {
      return getTheirProfile(params.username);
    }
  }
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getWhoseProfile,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  // Destructure user.data.data safely
  const {
    firstName,
    lastName,
    bio,
    followersCount,
    followingCount,
    location,
    account,
    coverImage,
  } = user.data.data;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
      <img
        src={coverImage?.url || "https://via.placeholder.com/800x450.png"}
        alt="Cover"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <img
          src={
            account?.avatar?.url || "https://via.placeholder.com/200x200.png"
          }
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white"
        />
        <h2 className="text-xl font-semibold text-gray-800 text-center mt-3">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-600 text-sm text-center mt-1">{bio}</p>
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Follow
          </button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="font-semibold text-gray-700">{followersCount}</p>
            <p className="text-xs text-gray-600">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">{followingCount}</p>
            <p className="text-xs text-gray-600">Following</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-gray-700">Location</p>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>
      <div className="flex place-content-center justify-between my-3">
        <Link
          className="bg-lime-400 py-2 px-4 font-bold mx-10 rounded-lg"
          to={`/${params.username || userData.username}`}>
          Posts
        </Link>
        <Link
          className="bg-lime-400 py-2 px-4 font-bold mx-10 rounded-lg"
          to={`/photos/${params.username || userData.username}`}>
          Photos
        </Link>
      </div>
    </div>
  );
}
