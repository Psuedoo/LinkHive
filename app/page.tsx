import { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";

interface LinkType {
  id: number;
  url: string;
  title: string;
}

function Link(LinkProps: LinkType) {
  return (
    <div className="p-10 m-2 border border-yellow-300">
      <a href={LinkProps.url}>{LinkProps.title}</a>
    </div>
  );
}

async function Links() {
  let links = await prisma.link.findMany();

  return (
    <div className="flex flex-row">
      {links.map((link) => (
        <Link key={link.id} {...link} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Links />
    </main>
  );
}
