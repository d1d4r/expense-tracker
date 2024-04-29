import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const seeder = async () => {
  const prisma = new PrismaClient();
  console.log("seeding database ...");
  const userCount = 10; // Adjust the number of users to seed

  try {
    await prisma.user.deleteMany();
    for (let index = 0; index < userCount; index++) {
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.internet.userName(),
        },
      });
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.log("🚀 ~ seeder ~ error:", error);
  }
};

seeder();
