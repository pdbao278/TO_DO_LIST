// 'use client';
import React from "react";
import GetUserByRoles from "@/components/roles/GetUsersByRoles";
import Header from "@/components/layout/Header";
import type { ParamsRoles } from "@/types/roles";

export default async function UsersPage({
  params,
}: {
  params: Promise<ParamsRoles> | ParamsRoles;
}) {
  const resolvedParams = await params;

  return (
    <main>
      <Header />
      <GetUserByRoles params={resolvedParams} />
    </main>
  );
}
