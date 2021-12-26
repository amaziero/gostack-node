import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

class UsersTokenRepositoryInMemory implements IUserTokenRepository {
  private userTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id && userToken.refresh_token === token
    );

    return userToken;
  }

  async deleteById(token_id: string): Promise<void> {
    const tokeToDelete = this.userTokens.findIndex(
      (userToken) => userToken.id === token_id
    );
    delete this.userTokens[tokeToDelete];

    // const userToken = this.userTokens.find(
    //   (userToken) => userToken.id === token_id
    // );
    // this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findUserByRefreshToken(
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }
}

export { UsersTokenRepositoryInMemory };
