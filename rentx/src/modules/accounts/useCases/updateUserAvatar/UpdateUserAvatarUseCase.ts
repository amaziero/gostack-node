import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUserRepositories";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepostory: IUsersRepository
  ) {}
  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepostory.findById(user_id);

    user.avatar = avatar_file;

    await this.usersRepostory.create(user);
  }
}

export { UpdateUserAvatarUseCase };
