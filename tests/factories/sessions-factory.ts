import { session } from "@prisma/client";
import { createUser } from "./users-factory";
import { prisma } from "@/config";

export async function createSession(token: string): Promise<session> {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token: token,
      user_id: user.id,
    },
  });
}
