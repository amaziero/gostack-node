import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepositories";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
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
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
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

    const token = sign({}, auth.secret_token, {
      subject: userFind.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: userFind.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.userTokenRepository.create({
      user_id: userFind.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
    });

    const tokenReturn: IReponse = {
      user: {
        name: userFind.name,
        email: userFind.email,
      },
      token,
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
