import { ExercisesData } from "@/services";
import { prisma } from "@/config";

async function createExercise(exerciseData: ExercisesData, user_id: number) {
  return prisma.exercise.create({
    data: {
      name: exerciseData.name,
      duration_min: exerciseData.duration_min,
      date: new Date(exerciseData.date),
      user_id,
    },
  });
}

async function associateMuscleGroupToExercise(exercise_id: number, muscleGroup: string) {
  const muscleGroupId = (await prisma.muscle_groups.findFirst({
    where: {
      name: muscleGroup
    }
  })).id;
  
  return prisma.exercise_muscle_groups.create({
    data: {
      exercise_id,
      muscle_groups_id: muscleGroupId
    }
  })
}

const exercisesRepository = {
  createExercise,
  associateMuscleGroupToExercise
};

export default exercisesRepository;