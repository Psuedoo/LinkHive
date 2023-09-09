import { CreateLinkButton } from "./components/createLinks";
import { LinksGrid } from "./components/links";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-primary-100">
      <LinksGrid />
      <CreateLinkButton />
    </main>
  );
}
