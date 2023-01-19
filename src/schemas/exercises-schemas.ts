import { ExercisesData, ExercisesPostParams } from "@/services";
import { MUSCLEGROUPSNAMES } from "@/utils/enum-utils";
import Joi from "joi";

export const exerciseSchema = Joi.object<ExercisesPostParams>({
  exercise: Joi.object<ExercisesData>({
    name: Joi.string().min(1).required(),
    duration_min: Joi.number().integer().required(),
    date: Joi.date(),
  }).required(),
  muscleGroups: Joi.array().items(
    Joi.string().valid(
      ...Object.values(MUSCLEGROUPSNAMES)
    ).required()
  ).required(),
});
