import { CreateLinkDialog } from "@/app/components/createLinks";
import { LinksGrid } from "@/app/components/links";
import { getCurrentUser } from "@/lib/session";
import { getLinks } from "@/lib/api/links/queries";
import { SearchBar } from "@/app/components/search";

export const dynamic = "force-dynamic";

export default async function LinkPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getCurrentUser();
  const links = await getLinks(params.slug);
  return (
    <main className="flex w-screen flex-col items-center">
      <div className="flex flex-col w-2/3 pt-20">
        <SearchBar />
        <LinksGrid links={links} user={user} />
        <div id="create-link-button" className="fixed inset-x-auto bottom-10 right-10 mb-4 mr-4">
          {user ? <CreateLinkDialog /> : <></>}
        </div>
      </div>
    </main>
  );
}
