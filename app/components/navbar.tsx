"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { SearchBar } from "./search";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import NextLink from "next/link";
import { useEffect, useState } from "react";

function NavbarButton({ func, children }: { func: any; children: any }) {
  return (
    <button
      onClick={() => func()}
      className={
        "flex justify-center items-center h-10 w-20 bg-secondary-500 rounded-lg text-black"
      }
    >
      {children}
    </button>
  );
}

export function SignInButton(props: any) {
  return <NavbarButton func={signIn}>Login</NavbarButton>;
}

function ProfileContextItem() {
  return (
    <NextLink href="/profile">
      <div className="flex flex-col">
        <h1>Profile</h1>
      </div>
    </NextLink>
  );
}

function SignOutContextItem() {
  return (
    <div
      onClick={() => {
        signOut();
      }}
      className="flex flex-col"
    >
      <h1>Sign Out</h1>
    </div>
  );
}

export default function Navbar() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [authButton, setAuthButton] = useState(<SignInButton />);

  function AvatarButton() {
    let items = [
      {
        key: "1",
        label: <ProfileContextItem />,
      },
      {
        key: "2",
        label: <SignOutContextItem />,
      },
    ];

    useEffect(() => {
      if (session?.user?.admin) {
        items.splice(1, 0, {
          key: "3",
          label: (
            <NextLink href="/admin">
              <h1>Admin</h1>
            </NextLink>
          ),
        });
      }
    }, [session]);

    return (
      <>
        <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </>
    );
  }

  useEffect(() => {
    if (session) {
      setAuthButton(<AvatarButton />);
    }
    if (!session) {
      setLoading(false);
    }
  }, [session]);

  return (
    <div className="flex flex-row place-content-evenly h-20 bg-primary-300 border-b-8 border-b-secondary-500 ">
      <div className="flex items-center place-content-between w-5/6">
        <NextLink href="/">
          <h1 className="text-black">LinkHive</h1>
        </NextLink>
        <SearchBar />
        {loading ? <>loading</> : <>{authButton}</>}
      </div>
    </div>
  );
}
