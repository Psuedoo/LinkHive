import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  let links = [];

  const userId = session?.user.id;
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
    return NextResponse.json(links);
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { title, url, authRequired } = body;

  const link = await prisma.link.create({
    data: {
      url,
      title,
      authRequired,
      User: { connect: { id: userId } },
    },
  });

  return NextResponse.json(link);
}
