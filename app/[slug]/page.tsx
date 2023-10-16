import LinkPage from "../components/linkPage";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  return <LinkPage params={params} />;
}
