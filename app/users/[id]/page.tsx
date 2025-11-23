'use client';
import React from "react";
import GetUserByID from "@/components/users/GetUserByID";
import SearchUser from "@/components/users/SearchUser";
import type { IParamsUser } from "@/types/users";

export default async function UsersPage({params}: {params: Promise<IParamsUser>}) {
  const resolvedParams = await params;
  return (
    <main>
      <SearchUser />
      <GetUserByID params={resolvedParams} />
    </main>
  );
}
