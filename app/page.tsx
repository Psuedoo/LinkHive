import { CreateLinkButton } from "./components/createLinks";
import { LinksGrid } from "./components/links";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getLinks } from "@/lib/api/links/queries";
import { SearchBar } from "./components/search";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();
  const links = await getLinks();
  return (
    <main className="flex w-screen flex-col items-center">
      <div className="flex flex-col w-2/3 pt-20">
        <SearchBar />
        <LinksGrid links={links} />
        {user ? <CreateLinkButton /> : <></>}
      </div>
    </main>
  );
}
