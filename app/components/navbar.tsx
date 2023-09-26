"use client";
import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import { ModeToggle } from "@/components/themeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LinkHiveLogoComponent from "@/public/LinkHiveLogo";

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
    <NextLink href="/profile" className="w-full">
      <span>Profile</span>
    </NextLink>
  );
}

function SignOutContextItem() {
  return (
    <div
      onClick={() => {
        signOut();
      }}
      className="w-full"
    >
      <h1>Sign Out</h1>
    </div>
  );
}

function AdminContextItem() {
  return (
    <NextLink href="/admin" className="w-full">
      <h1>Admin</h1>
    </NextLink>
  );
}

export default function Navbar(props: any) {
  function AvatarButton() {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={props.user.image} />
              <AvatarFallback>
                <AvatarIcon />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{props.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <ProfileContextItem />
            </DropdownMenuItem>
            {props.user.admin ? (
              <DropdownMenuItem>
                <AdminContextItem />
              </DropdownMenuItem>
            ) : (
              <> </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutContextItem />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
  return (
    <div className="flex flex-row place-content-evenly h-20 bg-background">
      <div className="flex items-center place-content-between w-5/6">
        <NextLink href="/">
          <LinkHiveLogoComponent width={150} className="fill-foreground" />
        </NextLink>
        <div className="flex justify-center items-center">
          <ModeToggle />
          {props.user ? <AvatarButton /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
}
