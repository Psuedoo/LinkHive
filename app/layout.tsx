import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Navbar from "./components/navbar";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/lib/session";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkHive",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className + " bg-background"}>
        <NextAuthProvider>
          <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>
              <Navbar user={user} />
              {children}
            </ConfigProvider>
          </StyledComponentsRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
