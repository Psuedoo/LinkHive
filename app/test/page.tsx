import { getLinks } from "@/lib/api/links/queries";
import MyLinks, { CreateLinkButton } from "../components/testLinks";

export default async function Page() {
  const links = await getLinks();
  return (
    <>
      <CreateLinkButton />
      <MyLinks links={links} />
    </>
  );
}
