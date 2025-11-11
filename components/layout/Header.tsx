"use client";

import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useNotification } from "@/contexts/NotificationContext";
import type { MenuProps } from "antd";
import { getInfoToken, logout } from "@/actions/auth.actions";
import { IInfoToken } from "@/types/auth";

export default function Header() {
  const router = useRouter();
  const { showSuccess } = useNotification();
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
    console.log(user);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Đăng xuất thành công", "Hẹn gặp lại bạn!");
      router.push("/auth");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <h1 className="text-2xl font-bold text-blue-600">TodoList</h1>
          </div>

          <div className="flex items-center">
            {user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  className="flex items-center gap-2"
                >
                  <span className="hidden sm:inline">{user.username}</span>
                </Button>
              </Dropdown>
            ) : (
              <Button
                type="primary"
                onClick={() => router.push("/auth")}
                className="font-medium"
              >
                Đăng nhập
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Button type="text" icon={<MenuOutlined />} />
          </div>
        </div>
      </div>
    </header>
  );
}
