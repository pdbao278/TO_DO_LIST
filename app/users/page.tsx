
import React from "react";  
import GetAllUsers from "@/components/users/GetAllUSers";
import Header from "@/components/layout/Header";
export default function UsersPage() {
  return (
    <main>
      <Header></Header>
      <GetAllUsers />
    </main>
  );
}
