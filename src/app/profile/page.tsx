"use client";

import React, { useContext } from "react";
import PostsGrid from "../components/PostsGrid";
import MyProfileActions from "../components/MyProfileActions";
import { AuthenticationContext } from "../context/AuthContext";

export interface IUser {
  id: number;
  name: string;
  username: string;
  profile_img: string;
  bio: string;
}

const Profile = () => {
  const { user } = useContext(AuthenticationContext);

  const statsBox = (count: number, title: string) => (
    <div className="basis-1/3">
      <div className="font-medium">{count}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );

  return (
    <div className="container mx-auto w-full sm:w-3/4 py-5 divide-y divide-gray-600">
      <div className="flex mb-5">
        <div className="mr-3">
          <img
            src={user?.profile_img}
            className="w-48 h-48 object-cover object-center rounded-full"
          />
        </div>
        <div className="grow p-3">
          <MyProfileActions user={user} />
          {/* <ProfileActions user={user} /> */}
          <div className="flex my-4">
            {statsBox(10, "Posts")}
            {statsBox(794, "Followers")}
            {statsBox(103, "Sales")}
          </div>
          <div className="mb-1">{user?.name}</div>
          <div className="whitespace-pre-line text-gray-500 text-sm">
            {user?.bio}
          </div>
        </div>
      </div>
      <div className="pt-5">
        <PostsGrid />
      </div>
    </div>
  );
};

export default Profile;
