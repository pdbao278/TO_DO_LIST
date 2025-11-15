"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchUser() {
  const [searchId, setSearchId] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchId.trim()) return;
    router.push(`/users/${searchId}`); 
  };

  return (
    <div className="flex justify-center gap-2 my-4">
      <input
        type="text"
        placeholder="Nhập ID user..."
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="border p-2 rounded w-xl"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Tìm
      </button>
    </div>
  );
}
