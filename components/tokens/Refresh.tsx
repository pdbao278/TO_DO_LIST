"use client";

import { useEffect, useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { getTokenInfo, refreshToken } from "@/actions/tokens.action";
import type { InfoToken } from "@/types/tokens";

export default function SearchRoles() {
    const { showSuccess, showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<InfoToken | null>(null);
    const [refreshFlag, setRefreshFlag] = useState(false); // Dùng flag để trigger lại useEffect

    // Hàm fetch token info
    const fetchTokenInfo = async () => {
        setLoading(true);
        try {
            const tokenInfo = await getTokenInfo();
            setToken(tokenInfo);
        } catch (error) {
            console.error(error);
            showError("Có lỗi xảy ra khi lấy thông tin token!");
        } finally {
            setLoading(false);
        }
    };
    // useEffect để fetch token info khi component mount hoặc khi refreshFlag thay đổi
    useEffect(() => {
        fetchTokenInfo();
    }, [refreshFlag]);

    // Hàm refresh token
    const handleRefresh = async () => {
        setLoading(true); 
        try {
            const res= await refreshToken(); // refresh token
            setRefreshFlag(!refreshFlag); // Trigger lại useEffect để lấy thông tin mới
            showSuccess("Token đã được làm mới thành công!",res.message);
        } catch (error) {
            console.error(error);
            showError("Có lỗi khi làm mới token!",);
        } finally {
            setLoading(false); 
        }
    };

    // Nếu đang load, hiển thị loading
    if (loading && !token) {
        return <div className="p-4 text-center">Đang tải thông tin token...</div>;
    }

    // Nếu không có token
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
                    className="w-full md:w-48 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={handleRefresh}
                >
                    Làm mới token
                </button>
            </div>
        </div>
    );
}
