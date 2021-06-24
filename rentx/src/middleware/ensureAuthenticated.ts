import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensuereAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new Error("Token missing!");
  }

  const [, token] = authHeaders.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "d49a788c5fd4110f406cfa0216bdd14f"
    ) as IPayload;

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not fund");
    }

    next();
  } catch (error) {
    throw new Error("invalid token");
  }
}
