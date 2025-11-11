"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { register } from "@/actions/auth.actions";
import { IRegisterRequest } from "@/types/auth";
import { useNotification } from "@/contexts/NotificationContext";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const registerData: IRegisterRequest = {
        username: values.username,
        password: values.password,
      };

      const result = await register(registerData);

      if (result.ok) {
        showSuccess(
          "Đăng ký thành công",
          result.message || "Tài khoản của bạn đã được tạo. Hãy đăng nhập!"
        );
      } else {
        showError(
          "Đăng ký thất bại",
          result.message || "Email đã tồn tại hoặc thông tin không hợp lệ"
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
      name="register"
      onFinish={onFinish}
      layout="vertical"
      className="space-y-4"
    >
      <Form.Item
        name="text"
        label={
          <span className="font-medium text-gray-700">Tên người dùng</span>
        }
        rules={[{ required: true, message: "Vui lòng nhập username" }]}
      >
        <Input placeholder="Nhập username" />
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className="font-medium"
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}
