import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: {
            email: "admin@admin.com",
        },
        update: {},
        create: {
            name: "admin",
            password: "admin",
        }
    });
    console.log("Upserted user: ", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });