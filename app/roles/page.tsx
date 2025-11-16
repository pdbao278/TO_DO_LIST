"use client";
import Header from "@/components/layout/Header";
import SearchRoles from "@/components/roles/SearchRoles";
import GetAllRoles from "@/components/roles/GetAllRoles";
import  CreateRoles  from "@/components/roles/CreateRoles";
export default function UsersPage() {
  return (
    <main>
      <Header></Header>
      <SearchRoles></SearchRoles>
      <CreateRoles></CreateRoles>
      <GetAllRoles />
    </main>
  );
}
