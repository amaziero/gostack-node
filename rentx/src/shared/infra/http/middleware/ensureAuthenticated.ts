import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/Errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

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
    throw new AppError("Token missing!", 401);
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
      throw new AppError("User not fund", 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError("invalid token", 401);
  }
}
