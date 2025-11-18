import React from "react";
import GetRolesByID from "@/components/roles/GetRolesByID";
import Header from "@/components/layout/Header";
import SearchRoles from "@/components/roles/SearchRoles";
import type { ParamsRoles} from "@/types/roles";

export default async function UsersPage({params}: {params: Promise<ParamsRoles>}) {
  const resolvedParams = await params;
  return (
    <main>
      <Header></Header>
        <SearchRoles></SearchRoles>
      <GetRolesByID params={resolvedParams} />
    </main>
  );
}
