import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | undefined> {
    const userToken = await this.repository.findOne({
      where: { user_id, refresh_token: token },
    });

    return userToken;
  }

  async deleteById(token_id: string): Promise<void> {
    await this.repository.delete(token_id);
  }

  async findUserByRefreshToken(
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.repository.findOne({ where: { refresh_token } });

    return userToken;
  }
}

export { UsersTokenRepository };
