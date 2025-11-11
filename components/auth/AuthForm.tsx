"use client";

import React, { useState } from "react";
import { Card, Button, Space, Typography } from "antd";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const { Title, Text } = Typography;

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="grid place-items-center min-h-[80vh] p-5 from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <Title>{mode === "login" ? "Đăng nhập" : "Đăng ký"}</Title>
        </div>

        <div className="mt-6">
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        <div className="mt-6 text-center">
          <Space>
            <Text className="text-gray-600">
              {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            </Text>
            <Button
              type="link"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Đăng ký" : "Đăng nhập"}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};
