import { exercise } from "@prisma/client";
import { MUSCLEGROUPSNAMES } from "@/utils/enum-utils";
import exercisesRepository from "@/repositories/exercises-repository";

export async function registerExercise(newExercise: NewExercise) {
  const createdExercise = await exercisesRepository.createExercise(newExercise.exercise, newExercise.user_id);
  
  Object.values(newExercise.muscleGroups).forEach(muscleGroup => {
    associateMuscleGroupToExercise(createdExercise.id, muscleGroup);
  });

  const result = {
    exercise: createdExercise,
    muscleGroups: newExercise.muscleGroups
  };

  return result
}

async function associateMuscleGroupToExercise(exercise_id: number, muscleGroup: string) {
  await exercisesRepository.associateMuscleGroupToExercise(exercise_id, muscleGroup);
}

export type ExercisesData = Pick<exercise, "name" | "duration_min" | "date">;

export type ExercisesPostParams = {
  exercise: ExercisesData,
  muscleGroups: Array<MUSCLEGROUPSNAMES>
}

type NewExercise = ExercisesPostParams & {
  user_id: number
}

const exerciseService = {
  registerExercise,
};

export default exerciseService;
