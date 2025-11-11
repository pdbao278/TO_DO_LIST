"use client";

import { getInfoToken } from "@/actions/auth.actions";
import { IInfoToken } from "@/types/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<IInfoToken | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getInfoToken();
        if (response.ok && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <main className="min-h-screen from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Chào mừng đến với TodoList
          </h1>
        </div>
      </div>
    </main>
  );
}
