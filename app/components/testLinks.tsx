"use client";

import { createLink } from "@/lib/api/links/mutations";
import { Link } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function MyLinks({ links }: { links: Link[] }) {
  const linkComponents = links.map((link, index) => (
    <div className="text-text" key={index}>
      {link.title}
    </div>
  ));

  return <>{linkComponents}</>;
}

export function CreateLinkButton() {
  const router = useRouter();
  const createNewLink = () => {
    const title = "title";
    const url = "url";
    let authRequired = false;
    createLink({ title, url, authRequired });
    router.refresh();
  };

  return (
    <button onClick={createNewLink} className="text-text bg-secondary">
      Create a thing
    </button>
  );
}
