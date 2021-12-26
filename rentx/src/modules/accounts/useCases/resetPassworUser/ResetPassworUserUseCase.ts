import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUserRepositories";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPassworUserUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepostory: IUsersRepository
  ) {}
  async execulte({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findUserByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Token not valid or not found");
    }

    if (
      !this.dateProvider.compareIfBefore(
        userToken.created_at,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepostory.findById(userToken.user_id);

    if (!user) {
      throw new AppError("Can't find user");
    }

    user.password = await hash(password, 8);

    await this.usersRepostory.create(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPassworUserUseCase };
