import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from "../../../repositories/IUserRepositories"
import { User } from "../entities/User"
import { AppError } from "@shared/Errors/AppError"

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
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
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
