import { Link, PrismaClient } from "@prisma/client";
import { UserType } from "@/app/components/user";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type NewLinkType = Omit<Link, "id">;

async function main() {
  const password = await bcrypt.hash("admin", 10);
  const user: UserType = {
    name: "admin",
    password: password,
    admin: true,
  };
  const createdUser = await prisma.user.upsert({
    where: {
      email: "admin@admin.com",
    },
    update: {},
    create: { ...user },
  });

  const link: NewLinkType = {
    url: "https://google.com/",
    title: "Google - Public (seeded)",
    authRequired: false,
    userId: createdUser.id,
  };

  const createdLink = await prisma.link.create({ data: { ...link } });

  console.log("Upserted user: ", createdUser);
  console.log("Created link: ", createdLink);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
