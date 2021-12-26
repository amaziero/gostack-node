import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/Errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let authenticateUserUserCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Jhon Doe",
      driver_license: "B",
      email: "jhon_doe@test.com",
      password: "test123",
    };

    await createUserUseCase.execute(user);
    const authenticateTest = await authenticateUserUserCase.execulte({
      email: user.email,
      password: user.password,
    });

    expect(authenticateTest).toHaveProperty("token");
  });

  it("should not be able to create a user", async () => {
    await expect(
      authenticateUserUserCase.execulte({
        email: "jhon_doe@test.com",
        password: "test123",
      })
    ).rejects.toEqual(
      new AppError("Error trying to check email and pass, try again!")
    );
  });

  it("should not be able to authenticate with wrong password", async () => {
    const user: ICreateUserDTO = {
      name: "Jhon Doe",
      driver_license: "B",
      email: "jhon_doe@test.com",
      password: "right_password",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUserCase.execulte({
        email: user.email,
        password: "wrong_password",
      })
    ).rejects.toEqual(
      new AppError("Error trying to check email and pass, try again!")
    );
  });
});
