import { prisma } from "@/config";
import { MUSCLEGROUPSNAMES } from "@/utils/enum-utils";
import faker from "@faker-js/faker";

export async function createExercise(user_id: number) {
  const createdExercise = await prisma.exercise.create({
    data: {
      name: "Exercise",
      duration_min: Math.floor(Math.random() * 100),
      date: faker.date.past(),
      user_id,
    }
  });

  const muscles = [ MUSCLEGROUPSNAMES.Abdomen, MUSCLEGROUPSNAMES.Cardiovascular ];

  for (const muscle of muscles) {
    const muscle_groups_id = (await prisma.muscle_groups.findFirst({
      where: {
        name: muscle,
      }
    })).id;

    await prisma.exercise_muscle_groups.create({
      data: {
        exercise_id: createdExercise.id,
        muscle_groups_id: muscle_groups_id,
      }
    })
  }

  return {
    exercise: createdExercise,
    muscleGroups: muscles
  }
};
