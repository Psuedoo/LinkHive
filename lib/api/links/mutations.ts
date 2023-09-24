"use server";
import { Link } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

type UpdateLinkInput = Omit<Link, "userId">;
type CreateLinkInput = Omit<Link, "id" | "userId">;

export async function createLink(link: CreateLinkInput) {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const newLink = await prisma.link.create({
      data: {
        ...link,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newLink;
  }
}

export async function deleteLink(id: string) {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const deletedLink = await prisma.link.delete({
      where: { id: id },
    });

    return deletedLink;
  }
}

export async function updateLink({ link }: { link: UpdateLinkInput }) {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const updatedLink = await prisma.link.update({
      where: { id: link.id },
      data: {
        ...link,
      },
    });

    return updatedLink;
  }
}
