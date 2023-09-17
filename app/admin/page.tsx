"use client";

import { Button, Space } from "antd";
import { CreateUserButton } from "../components/user";
import { useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    },
  });

  if (status === "loading") {
    window.location.replace("/");
    return "loading";
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center bg-primary-100">
      <Space direction="vertical" size="large" className="pt-20">
        <CreateUserButton />
      </Space>
    </main>
  );
}
