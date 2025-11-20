"use client";
import SearchRoles from "@/components/roles/SearchRoles";
import GetAllRoles from "@/components/roles/GetAllRoles";
import  CreateRoles  from "@/components/roles/CreateRoles";
export default function UsersPage() {
  return (
    <main>
      <SearchRoles></SearchRoles>
      <CreateRoles></CreateRoles>
      <GetAllRoles />
    </main>
  );
}
