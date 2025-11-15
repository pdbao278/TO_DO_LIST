import React from "react";
import GetUserByID from "@/components/users/GetUserByID";
import Header from "@/components/layout/Header";
import SearchUser from "@/components/users/SearchUser";
import type { ParamsUser } from "@/types/users";

export default async function UsersPage({params}: {params: Promise<ParamsUser>}) {
  const resolvedParams = await params;
  return (
    <main>
      <Header />
      <SearchUser />
      <GetUserByID params={resolvedParams} />
    </main>
  );
}
