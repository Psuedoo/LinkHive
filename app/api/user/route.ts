import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.error();
  } else if (userId && !session?.user.admin) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { name, password, admin } = body;

  const link = await prisma.user.create({
    data: {
      name,
      password,
      admin,
    },
  });

  return NextResponse.json(link);
}
