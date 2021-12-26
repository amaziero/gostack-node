import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/Errors/AppError";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepostory: UsersRepositoryInMemory;
let userTokenRepository: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send forgot email", () => {
  beforeEach(() => {
    usersRepostory = new UsersRepositoryInMemory();
    userTokenRepository = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepostory,
      userTokenRepository,
      dateProvider,
      mailProvider
    );
  });

  it("Shoudl be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepostory.create({
      name: "alison",
      email: "alison@example.com",
      password: "123456",
      driver_license: "abc-1234",
    });

    await sendForgotPasswordEmailUseCase.execulte("alison@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to reset password of an user that does not exists", async () => {
    await expect(
      sendForgotPasswordEmailUseCase.execulte("alison@example.com")
    ).rejects.toEqual(
      new AppError("user not found, are you sure the email is correct?")
    );
  });

  it("Should be able to crete an user token", async () => {
    const generateTokenMail = jest.spyOn(userTokenRepository, "create");
    await usersRepostory.create({
      name: "alison",
      email: "alison@example.com",
      password: "123456",
      driver_license: "abc-1234",
    });

    await sendForgotPasswordEmailUseCase.execulte("alison@example.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
