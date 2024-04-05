const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  const numberOfPosts = 20;
  const commentsPerPost = 5;

  for (let i = 0; i < numberOfPosts; i++) {
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
      },
    });

    for (let j = 0; j < commentsPerPost; j++) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.paragraphs(),
          postId: post.id,
        },
      });
    }
  }

  console.log(
    `${numberOfPosts} posts with ${commentsPerPost} comments each have been created.`
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
