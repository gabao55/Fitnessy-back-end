import * as jwt from "jsonwebtoken";
import { users } from "@prisma/client";

import { createUser } from "./factories";
import { createSession } from "./factories/sessions-factory";
import { prisma } from "@/config";
import httpStatus from "http-status";
import supertest from "supertest";
import faker from "@faker-js/faker";

export async function cleanDb() {
  await prisma.session.deleteMany({});
  await prisma.exercise_muscle_groups.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}

export function noToken(method: (url: string)=> supertest.Test, rout: string) {
  it("should respond with status 401 if no token is given", async () => {
    const response = await method(rout);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await method(rout).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await method(rout).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
}
