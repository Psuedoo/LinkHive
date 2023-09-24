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
        "flex justify-center items-center h-10 w-20 bg-secondary-500 rounded-lg text-text"
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

export default function Navbar(props: any) {
  function AvatarButton() {
    let items = [
      {
        key: "1",
        label: <ProfileContextItem />,
      },
    ];
    const isAdmin = props.user.admin;

    if (isAdmin) {
      items.push({
        key: "2",
        label: (
          <>
            <NextLink href="/admin">
              <h1>Admin</h1>
            </NextLink>
          </>
        ),
      });
    }

    items.push({
      key: `${items.length + 1}`,
      label: <SignOutContextItem />,
    });

    return (
      <>
        <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </>
    );
  }
  return (
    <div className="flex flex-row place-content-evenly h-20 bg-background">
      <div className="flex items-center place-content-between w-5/6">
        <NextLink href="/">
          <h1 className="text-text">LinkHive</h1>
        </NextLink>
        <SearchBar />
        {props.user ? <AvatarButton /> : <SignInButton />}
      </div>
    </div>
  );
}
