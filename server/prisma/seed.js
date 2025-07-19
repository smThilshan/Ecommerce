const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: "securepassword",
      role: "admin",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        title: "Product A",
        description: "Product A description",
        price: 10.0,
        stock: 100,
      },
      {
        title: "Product B",
        description: "Product B description",
        price: 15.0,
        stock: 200,
      },
    ],
  });
  console.log("Seeding done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());