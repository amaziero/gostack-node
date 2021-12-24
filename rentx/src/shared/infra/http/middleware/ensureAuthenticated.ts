import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/Errors/AppError";

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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

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
