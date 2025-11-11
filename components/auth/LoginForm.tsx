"use client";

import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth.actions";
import { ILoginRequest } from "@/types/auth";
import { getOrCreateDeviceId } from "@/utils/deviceId";
import { useNotification } from "@/contexts/NotificationContext";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const deviceId = getOrCreateDeviceId();

      const loginData: ILoginRequest = {
        username: values.username,
        password: values.password,
        deviceId: deviceId,
        rememberMe: values.remember || false,
      };

      const result = await login(loginData);

      if (result.ok) {
        showSuccess(
          "Đăng nhập thành công",
          result.message || "Chào mừng bạn trở lại!"
        );
        window.location.href = "/";
      } else {
        showError(
          "Đăng nhập thất bại",
          result.message || "Vui lòng kiểm tra lại thông tin đăng nhập"
        );
      }
    } catch (err) {
      console.error(err);
      showError(
        "Lỗi kết nối",
        "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="username"
        label={
          <span className="font-medium text-gray-700">Tên người dùng</span>
        }
        rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="Nhập tên người dùng"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label={<span className="font-medium text-gray-700">Mật khẩu</span>}
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="••••••"
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox className="text-gray-600">Ghi nhớ đăng nhập</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className="font-medium"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};