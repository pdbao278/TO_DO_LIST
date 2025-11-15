"use client";
import React from "react";  
import GetAllUsers from "@/components/users/GetAllUsers";
import Header from "@/components/layout/Header";
import SearchUser from "@/components/users/SearchUser";
export default function UsersPage() {
  return (
    <main>
      <Header></Header>
      <SearchUser></SearchUser>
      <GetAllUsers />
    </main>
  );
}
