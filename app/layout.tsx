import { NotificationProvider } from "@/contexts/NotificationContext";
import "./globals.css";
import "antd/dist/reset.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
