"use client";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  return <button onClick={() => signIn()}>Sign In</button>;
}
