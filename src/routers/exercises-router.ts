import { Router } from "express";

import { exercisesDelete, exercisesList, exercisesPost, exercisesPut } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { exerciseSchema } from "@/schemas/exercises-schemas";

const exercisesRouter = Router();

exercisesRouter.all("*", authenticateToken);
exercisesRouter.post("/", validateBody(exerciseSchema), exercisesPost);
exercisesRouter.get("/", exercisesList);
exercisesRouter.put("/:exerciseId", exercisesPut);
exercisesRouter.delete("/:exerciseId", exercisesDelete);

export { exercisesRouter };
