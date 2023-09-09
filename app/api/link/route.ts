import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const linkId = searchParams.get("id");
  if (!linkId) {
    return NextResponse.error();
  }

  const userId = session?.user.id;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const link = await prisma.link.findUnique({
      where: { id: linkId, userId: user?.id },
    });

    return NextResponse.json(link);
  } else {
    return NextResponse.error();
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { id, title, url, authRequired } = body;

  const link = await prisma.link.update({
    where: { id: id, userId: userId },
    data: { title, url, authRequired },
  });

  return NextResponse.json(link);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.error();
  }

  const link = await prisma.link.delete({
    where: { id: id, userId: userId },
  });

  return NextResponse.json(link);
}
