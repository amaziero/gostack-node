import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

import { IUsersRepository } from "../../repositories/IUserRepositories";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepostory: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepostory.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(avatar_file, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.usersRepostory.create(user);
  }
}

export { UpdateUserAvatarUseCase };
