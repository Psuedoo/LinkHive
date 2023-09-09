import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Navbar from "./components/navbar";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkHive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>
              <Navbar />
              {children}
            </ConfigProvider>
          </StyledComponentsRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
