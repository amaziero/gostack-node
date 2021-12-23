import "reflect-metadata";
import dayjs from "dayjs";

import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/Errors/AppError";

import { RentalRepositoryInMemory } from "../../repositories/in-memory/rentalRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carRepositoryInMemory: CarRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs(1, "day").toDate();

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Test",
      description: "test",
      brand: "test",
      category_id: "123456",
      daily_rate: 100,
      fine_amount: 100,
      license_plate: "asd1235",
    });

    if (!car.id) {
      throw new AppError("car not found");
    }

    const createRental = {
      car_id: car.id,
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    };

    const rental = await createRentalUseCase.execute(createRental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental with a rental in progress", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Test",
      description: "test",
      brand: "test",
      category_id: "123456",
      daily_rate: 100,
      fine_amount: 100,
      license_plate: "asd1235",
    });

    if (!car.id) {
      throw new AppError("car not found");
    }

    const createRental = {
      car_id: car.id,
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    };

    await createRentalUseCase.execute(createRental);

    expect(async () => {
      await createRentalUseCase.execute(createRental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental car already rented", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Test",
      description: "test",
      brand: "test",
      category_id: "123456",
      daily_rate: 100,
      fine_amount: 100,
      license_plate: "asd1235",
    });

    if (!car.id) {
      throw new AppError("car not found");
    }

    const createRental = {
      car_id: car.id,
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
