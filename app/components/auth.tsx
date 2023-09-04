"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton(props: any) {
  return (
    <button {...props} onClick={() => signIn()}>
      Sign In
    </button>
  );
}

export function SignOutButton(props: any) {
  return (
    <button {...props} onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
