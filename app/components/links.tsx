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
  // const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    // setLoading(true);
    // setLoading(false);
    if (!user) return;
    allLinks({ userId: "clm3ss8zs0000f1oohg2tow1t" }).then((resp) => {
      setLinks(resp);
    });
    console.log("user", user?.id);
  }, [user, user?.id]);

  const links = remoteLinks.map((link) => <Link key={link.id} {...link} />);

  return <div className="flex flex-row">{links}</div>;
}
