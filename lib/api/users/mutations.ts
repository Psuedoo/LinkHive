"use server";

import { encryptPassword, verifyPassword } from "@/app/services/users";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function updatePassword(currentPassword: any, newPassword: any) {
  const user = await getCurrentUser();

  const userId = user?.id;

  if (!userId) {
    return;
  }

  if (await verifyPassword(currentPassword, user.password)) {
    const encryptedPassword = await encryptPassword(newPassword);
    const updatedLink = await prisma.user.update({
      where: { id: userId },
      data: {
        password: encryptedPassword,
      },
    });
    return updatedLink;
  }
}
