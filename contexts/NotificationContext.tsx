"use client";

import React, { createContext, useContext } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showSuccess: (message: string, description?: string) => void;
  showError: (message: string, description?: string) => void;
  showInfo: (message: string, description?: string) => void;
  showWarning: (message: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description?: string
  ) => {
    const icons = {
      success: <CheckCircleOutlined className="text-green-500" />,
      error: <CloseCircleOutlined className="text-red-500" />,
      info: <InfoCircleOutlined className="text-blue-500" />,
      warning: <WarningOutlined className="text-yellow-500" />,
    };

    const config: NotificationArgsProps = {
      message,
      description,
      icon: icons[type],
      placement: "topRight",
      duration: type === "error" ? 4 : 3,
      className: "rounded-lg shadow-lg",
    };

    api[type](config);
  };

  const showSuccess = (message: string, description?: string) => {
    showNotification("success", message, description);
  };

  const showError = (message: string, description?: string) => {
    showNotification("error", message, description);
  };

  const showInfo = (message: string, description?: string) => {
    showNotification("info", message, description);
  };

  const showWarning = (message: string, description?: string) => {
    showNotification("warning", message, description);
  };

  return (
    <NotificationContext.Provider
      value={{ showSuccess, showError, showInfo, showWarning }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
