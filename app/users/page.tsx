"use client";
import React from "react";  
import GetAllUsers from "@/components/users/GetAllUsers";
import SearchUser from "@/components/users/SearchUser";
export default function UsersPage() {
  return (
    <main>
      <SearchUser></SearchUser>
      <GetAllUsers />
    </main>
  );
}
