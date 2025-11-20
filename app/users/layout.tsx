import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Ứng dụng quản lý công việc đơn giản",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Content Area */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </>
  );
}
