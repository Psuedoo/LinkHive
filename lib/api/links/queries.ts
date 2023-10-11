"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

// TODO: Would be awesome to not need a second DB call
export async function getLinks(slug: string = "admin") {
  const user = await getCurrentUser();
  let links = [];
  const publicLinks = await prisma.link.findMany({
    where: {
      authRequired: false,
      User: { name: slug },
    },
  });

  links.push(...publicLinks);

  if (user?.name == slug) {
    const privateLinks = await prisma.link.findMany({
      where: {
        authRequired: true,
        User: { name: slug },
      },
    });
    links.push(...privateLinks);
  }

  return links;
}
