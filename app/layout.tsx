import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Navbar from "./components/navbar";
import { getCurrentUser } from "@/lib/session";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className={inter.className}>
        <div className="bg-background">
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar user={user} />
              {children}
            </ThemeProvider>
          </NextAuthProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
