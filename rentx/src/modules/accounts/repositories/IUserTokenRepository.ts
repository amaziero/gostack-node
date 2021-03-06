import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | undefined>;

  deleteById(token_id: string): Promise<void>;

  findUserByRefreshToken(
    refresh_token: string
  ): Promise<UserTokens | undefined>;
}

export { IUserTokenRepository };
