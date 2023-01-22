import app, { init } from "@/app";
import { prisma } from "@/config";
import httpStatus from "http-status";
import supertest from "supertest";
import { createExercise, createUser, createValidBodyForCreatingExercise } from "../factories";
import { cleanDb, generateValidToken, noToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /exercises", () => {
  noToken(server.post, "/exercises");
  
  describe("when token is valid", () => {
    it("should respond with status 400 when body is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post("/exercises").set("Authorization", `Bearer ${token}`).send({});

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 200 and created exercise data when body is valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const validBody = createValidBodyForCreatingExercise();

      const response = await server.post("/exercises").set("Authorization", `Bearer ${token}`).send(validBody);

      const createdExercise = await prisma.exercise.findFirst({
        where: {
          user_id: user.id
        }
      });

      const muscleGroups = await prisma.exercise_muscle_groups.findMany({
        where: {
          exercise_id: createdExercise.id
        },
        include: {
          muscle_groups: true,
        }
      });
      const muscleNames = muscleGroups.map(muscle => muscle.muscle_groups.name);

      expect(response.status).toEqual(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          exercise: expect.objectContaining({
            id: createdExercise.id,
            user_id: createdExercise.user_id,
            name: createdExercise.name,
            date: createdExercise.date.toISOString(),
            duration_min: createdExercise.duration_min,
            createdAt: createdExercise.createdAt.toISOString(),
          }),
          muscleGroups: muscleNames,
        })
      )
    });
  });
});

describe("GET /exercises", () => {
  noToken(server.get, "/exercises");
  
  describe("when token is valid", () => {
    it("should respond with status 200 and created exercise data when body is valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const createdExercise = await createExercise(user.id);

      const response = await server.get("/exercises").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: createdExercise.exercise.id,
            user_id: createdExercise.exercise.user_id,
            name: createdExercise.exercise.name,
            date: createdExercise.exercise.date.toISOString(),
            duration_min: createdExercise.exercise.duration_min,
            createdAt: createdExercise.exercise.createdAt.toISOString(),
            muscle_groups: createdExercise.muscleGroups,
          })
        ])
      )
    });
  });
});
