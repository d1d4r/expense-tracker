import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const seeder = async () => {
  console.log("seeding database ...");

  const prisma = new PrismaClient();

  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.transaction.deleteMany();

  const userCount = 10;
  const categoryCount = 5;
  const transactionCount = userCount;

  const categoriesarr = [];
  for (let index = 0; index < categoryCount; index++) {
    try {
      categoriesarr.push(
        prisma.category.create({
          data: {
            name: faker.commerce.department(),
            type: faker.helpers.arrayElement(["EXPENSE", "INCOME"]),
          },
        })
      );
    } catch (error) {
      if (error.code === "P2002") {
        console.log(
          `💥 Category with name "${categoriesarr[index]}" already exists.`
        );
      } else {
        throw error;
      }
    }
  }

  await Promise.all(categoriesarr);
  console.log("🚀 ~ seeder ~ categories:", categoriesarr);

  const usersarr = [];
  for (let index = 0; index < userCount; index++) {
    usersarr.push(
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        },
      })
    );

    await Promise.all(usersarr);
    console.log("🚀 ~ seeder ~ users:", usersarr);

    const users = await prisma.user.findMany();
    const categories = await prisma.category.findMany();

    
    for (let i = 0; i < transactionCount; i++) {
      const randomAmount = faker.number.float({ min: 10, max: 1000 });

       await prisma.transaction.create({
          data: {
            amount: randomAmount,
            description: faker.lorem.sentence(),
            type: faker.helpers.arrayElement(["EXPENSE", "INCOME"]),
            userId: faker.helpers.arrayElement(users).id,
            categoryId: faker.helpers.arrayElement(categories).id,
          },
        })
     
    }
  }
  

  console.log("Seeding complete!");
};

seeder();
