import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params?: { userId: string } }
) {
  let links = [];
  const userId = params?.userId;
  console.log("userId", userId);

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    links = await prisma.link.findMany({
      where: { userId: user?.id },
    });

    return NextResponse.json(links);
  } else {
    links = await prisma.link.findMany({
      where: { authRequired: false },
    });
  }

  return NextResponse.json(links);
}
