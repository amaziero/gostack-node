import dayjs from "dayjs";

import { AppError } from "@shared/Errors/AppError";

import "reflect-metadata";

import { RentalRepositoryInMemory } from "../../repositories/in-memory/rentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const createRental = {
      car_id: "123456",
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    };

    const rental = await createRentalUseCase.execute(createRental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental with a rental in progress", async () => {
    const createRental = {
      car_id: "123456",
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    };

    await createRentalUseCase.execute(createRental);

    expect(async () => {
      await createRentalUseCase.execute(createRental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental car already rented", async () => {
    const createRental = {
      car_id: "123456",
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    };

    await createRentalUseCase.execute(createRental);

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: createRental.car_id,
        user_id: "test",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "123456",
        user_id: "test",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
