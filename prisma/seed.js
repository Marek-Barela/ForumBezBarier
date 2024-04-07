const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < faker.random.number({ min: 1, max: 10 }); i++) {
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        userId: "user_2eler0TUF95BEeZDDsVNUODUpMW",
      },
    });

    for (let j = 0; j < faker.random.number({ min: 1, max: 10 }); j++) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.paragraphs(),
          postId: post.id,
        },
      });
    }
  }

  console.log("posts and comments each have been created.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
