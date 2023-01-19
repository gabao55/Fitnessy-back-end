import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  let muscle_group = await prisma.muscle_groups.findFirst();
  if (!muscle_group) {
    await seedMuscleGroups();
  }
}

async function seedMuscleGroups() {
  return prisma.muscle_groups.createMany({
    data: [
      {
        name: "Cardiovascular"
      },
      {
        name: "Abdomen"
      },
      {
        name: "Core"
      },
      {
        name: "Chest"
      },
      {
        name: "Back"
      },
      {
        name: "Shoulder"
      },
      {
        name: "Biceps"
      },
      {
        name: "Triceps"
      },
      {
        name: "Forearm"
      },
      {
        name: "Quadriceps"
      },
      {
        name: "Gluteus"
      },
      {
        name: "Hamstrings"
      },
      {
        name: "Calves"
      },
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
