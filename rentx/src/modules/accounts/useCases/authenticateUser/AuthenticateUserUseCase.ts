import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUserRepositories";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IReponse {
  user: {
    name: string | undefined;
    email: string | undefined;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execulte({ email, password }: IRequest): Promise<IReponse> {
    const userFind = await this.usersRepository.findByEmail(email);

    if (!userFind) {
      throw new AppError("Error trying to check email and pass, try again!");
    }

    const passwordMatch = await compare(password, userFind.password!);

    if (!passwordMatch) {
      throw new AppError("Error trying to check email and pass, try again!");
    }

    const token = sign({}, "d49a788c5fd4110f406cfa0216bdd14f", {
      subject: userFind.id,
      expiresIn: "1d",
    });

    const tokenReturn: IReponse = {
      token,
      user: {
        name: userFind.name,
        email: userFind.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
