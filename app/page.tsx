"use client";
import { Space } from "antd";
import { CreateLinkButton } from "./components/createLinks";
import { LinksGrid } from "./components/links";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-primary-100">
      <Space direction="vertical" size="large" className="pt-20">
        <LinksGrid />
        {session?.user ? <CreateLinkButton /> : <></>}
      </Space>
    </main>
  );
}
