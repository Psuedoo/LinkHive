"use client";
import { signIn, signOut, useSession } from "next-auth/react";

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
  return <NavbarButton func={signIn}>Sign In</NavbarButton>;
}

export function SignOutButton(props: any) {
  return <NavbarButton func={signOut}>Sign Out</NavbarButton>;
}

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row place-content-evenly h-20 bg-primary-300 border-b-8 border-b-secondary-500 ">
      <div className="flex items-center place-content-between w-5/6">
        <h1 className="text-black">LinkHive</h1>
        {session ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  );
}
