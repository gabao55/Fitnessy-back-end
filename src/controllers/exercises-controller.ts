import exerciseService from "@/services/exercises-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function exercisesPost(req: AuthenticatedRequest, res: Response) {
	const { exercise, muscleGroups } = req.body;
	const { userId } = req;

	try {
		const newExercise = {
			user_id: userId,
			exercise,
			muscleGroups
		}

		const createdExercise = await exerciseService.registerExercise(newExercise);

		return res.status(httpStatus.CREATED).send(createdExercise);
	} catch (error) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
	}
}

export async function exercisesList(req: AuthenticatedRequest, res: Response) {
	return res.send("OK");
}

export async function exercisesPut(req: AuthenticatedRequest, res: Response) {
	return res.send("OK");
}

export async function exercisesDelete(req: AuthenticatedRequest, res: Response) {
	return res.send("OK");
}
