"use client";

import { useEffect, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { getTokenInfo } from "@/actions/tokens.action";
import type { IInfoToken } from "@/types/tokens";
import { useRouter } from "next/navigation"; // Sửa Router => useRouter

export default function SearchRoles() {
    const { showSuccess, showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<IInfoToken | null>(null);
    const router = useRouter(); // Sử dụng hook useRouter để lấy router

    useEffect(() => {
  const fetchTokenInfo = async () => {
    setLoading(true);
    try {
      const tokenInfo = await getTokenInfo();
      if (tokenInfo.ok) {
        setToken(tokenInfo.data); // Chỉ lưu IInfoToken
      } else {
        showError("Không thể lấy thông tin token: " + tokenInfo.message);
      }
    } catch (error: any) {
      console.error("Lỗi khi fetch token:", error);
      showError("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  fetchTokenInfo();
}, []);


    if (loading) {
        return <div className="p-4 text-center">Đang tải thông tin token...</div>;
    }

    if (!token) {
        return <div className="p-4 text-center">Không tìm thấy thông tin token.</div>;
    }

    return (
<div className="p-8 max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Thông tin token</h1>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <p className="font-medium text-gray-600"><strong>Sub:</strong> {token.sub}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-gray-600"><strong>Username:</strong> {token.username}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-gray-600"><strong>Role:</strong> {token.role}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-gray-600"><strong>Devices:</strong> {token.devices}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-gray-600"><strong>Expires At:</strong> {token.expiresAt}</p>
                </div>
            </div>

            <div className="mt-6 flex justify-between space-x-4">
                <button
                    className="w-full md:w-48 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => router.push(`/tokens/create`)}
                >
                    Tạo token mới
                </button>
                <button
                    className="w-full md:w-48 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={() => router.push(`/tokens/refresh`)}
                >
                    Làm mới token
                </button>
                <button
                    className="w-full md:w-48 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={() => router.push(`/tokens/set-role`)}
                >
                    Thiết lập Vai trò
                </button>
            </div>
        </div>
    );
}
