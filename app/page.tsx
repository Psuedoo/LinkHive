import { Space } from "antd";
import { CreateLinkButton } from "./components/createLinks";
import { LinksGrid } from "./components/links";
import { SearchBar } from "./components/search";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-primary-100">
      <SearchBar />
      <Space direction="vertical" size="large" className="pt-20">
        <LinksGrid />
        <CreateLinkButton />
      </Space>
    </main>
  );
}
