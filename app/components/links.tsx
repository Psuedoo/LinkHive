"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { allLinks } from "../services/link";

function Link(LinkProps: any) {
  return (
    <div className="p-10 m-2 border border-yellow-300">
      <a href={LinkProps.url}>{LinkProps.title}</a>
    </div>
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
    <div className="flex flex-row">{loading ? <p>Loading...</p> : links}</div>
  );
}
