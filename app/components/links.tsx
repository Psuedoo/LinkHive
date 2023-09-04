"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
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

export function LinksGrid() {
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
      <CreateLink />
    </div>
  );
}

function CreateLinkModal(open: any) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <div>
      {show ? (
        <></>
      ) : (
        <div
          onClick={() => setShow(false)}
          className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50"
        >
          <div className="h-3/4 w-2/4 bg-white rounded-lg"></div>
        </div>
      )}
    </div>
  );
}

export function CreateLink() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CreateLinkModal open={open} />
      <button className="text-black" onClick={() => setOpen(true)}>
        Show modal
      </button>
    </div>
  );
}
