"use client";
import { signOut } from "next-auth/react";

export default function SignOutForm() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
