"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { allLinks } from "../services/link";
import { default as NextLink } from "next/link";

function Link(LinkProps: any) {
  return (
    <NextLink href={LinkProps.url}>
      <div className="m-2 border-8 rounded-md border-secondary-500 bg-secondary-400 p-10">
        <p className="text-black">{LinkProps.title}</p>
      </div>
    </NextLink>
  );
}

export function Links() {
  const [remoteLinks, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    allLinks().then((resp) => {
      setLinks(resp);
      setLoading(false);
    });
  }, [user?.id]);

  const links = remoteLinks.map((link) => <Link key={link.id} {...link} />);

  return (
    <div className="flex flex-row">
      {loading ? <p className="text-black">Loading...</p> : links}
    </div>
  );
}
