import { Space } from "antd";
import { CreateLinkButton } from "./components/createLinks";
import { LinksGrid } from "./components/links";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getLinks } from "@/lib/api/links/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();
  const links = await getLinks();
  return (
    <main className="flex w-screen flex-col items-center">
      <Space direction="vertical" size="large" className="pt-20">
        <LinksGrid links={links} />
        {user ? <CreateLinkButton /> : <></>}
      </Space>
    </main>
  );
}
