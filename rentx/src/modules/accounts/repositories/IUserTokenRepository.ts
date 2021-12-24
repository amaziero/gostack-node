import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | undefined>;

  deleteById(user_id: string): Promise<void>;
}

export { IUserTokenRepository };
