const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  for (
    let i = 0;
    i <
    faker.datatype.number({
      min: 3,
      max: 7,
    });
    i++
  ) {
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        userId: "user_2eler0TUF95BEeZDDsVNUODUpMW",
        author: faker.person.fullName(),
      },
    });

    for (
      let j = 0;
      j <
      faker.datatype.number({
        min: 3,
        max: 7,
      });
      j++
    ) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.paragraphs(),
          postId: post.id,
          author: faker.person.fullName(),
          userId: "user_2eler0TUF95BEeZDDsVNUODUpMW",
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
