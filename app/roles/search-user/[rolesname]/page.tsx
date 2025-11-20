// 'use client';
import React from "react";
import GetUserByRoles from "@/components/roles/GetUsersByRoles";

import type { ParamsRoles } from "@/types/roles";

export default async function UsersPage({
  params,
}: {
  params: Promise<ParamsRoles> | ParamsRoles;
}) {
  const resolvedParams = await params;

  return (
    <main>
      <GetUserByRoles params={resolvedParams} />
    </main>
  );
}
