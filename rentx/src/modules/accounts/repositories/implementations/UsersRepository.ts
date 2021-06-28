import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../Errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepositories";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      email,
    });

    if (user === undefined) {
      throw new AppError("Not user fund");
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    if (user === undefined) {
      throw new AppError("Not user fund");
    }

    return user;
  }
}

export { UserRepository };
