"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { allLinks, createLink } from "../services/link";
import { default as NextLink } from "next/link";
import { cursorTo } from "readline";

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
      {session ? <CreateLink /> : <></>}
    </div>
  );
}

function CreateLinkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [authRequired, setAuthRequired] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createLink({ title, url, authRequired });
    alert("Link created!");
  };

  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-black">Create a new link</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col place-content-evenly h-4/5 p-5"
      >
        <div className="flex flex-col">
          <label className="text-black">Title</label>
          <input
            type="text"
            placeholder="Google"
            className="text-black border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black">URL</label>
          <input
            type="text"
            placeholder="https://google.com"
            className="text-black border rounded-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-black">Log in required?</label>
          <input
            type="checkbox"
            className="text-black "
            checked={authRequired}
            onChange={(e) => setAuthRequired(e.target.checked)}
          />
        </div>
        <input type="submit" className="text-black bg-primary-300 rounded-lg" />
      </form>
    </div>
  );
}

export function CreateLink() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(open);
  }, [open]);

  const LinkModalContent = () => {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="flex flex-col h-3/4 w-2/4 bg-white rounded-lg">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex text-black place-self-end m-5"
          >
            X
          </button>
          <CreateLinkForm />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center">
      <div
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
        className="flex justify-center items-center bg-secondary-400 h-10 w-10 rounded-3xl"
      >
        <p className="text-black">+</p>
      </div>
      {open ? <LinkModalContent /> : <></>}
    </div>
  );
}
