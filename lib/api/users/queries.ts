"use server";
import { prisma } from "@/lib/prisma";

export async function getUsers() {
  return await prisma.user.findMany();
}
