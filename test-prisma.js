// Minimal Node.js script to test Prisma Client with your SQLite database

const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function main() {
  // List all entries in url_new table
  const urls = await prisma.url_new.findMany();
  console.log("url_new:", urls);

  // List all entries in url_index table
  const indices = await prisma.url_index.findMany();
  console.log("url_index:", indices);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
