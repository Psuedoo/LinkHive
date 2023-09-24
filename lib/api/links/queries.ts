"use server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function getLinks() {
  const user = await getCurrentUser();
  let links = [];

  const userId = user?.id;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    links = await prisma.link.findMany({
      where: { userId: user?.id },
    });

    return links;
  } else {
    links = await prisma.link.findMany({
      where: { authRequired: false },
    });
    return links;
  }
}
