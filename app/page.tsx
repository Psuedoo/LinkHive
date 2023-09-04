import { SignInButton, SignOutButton } from "./components/auth";
import { Links } from "./components/links";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <div>
        <SignInButton className="p-5" />
        <SignOutButton className="p-5" />
      </div>
      <Links />
    </main>
  );
}
