import { AppError } from "@shared/Errors/AppError";

import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepository: CarRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = {
      name: "test",
      description: "test car",
      daily_rate: 90,
      license_plate: "test-1234",
      fine_amount: 90,
      brand: "test",
      category_id: "test-to-test",
    };

    await createCarUseCase.execute(car);

    const searchCar = await carRepository.findByName(car.name);

    expect(searchCar).toHaveProperty("id");
  });

  it("Should not be able to create a car with same licence plate", async () => {
    const car = {
      name: "test",
      description: "test car",
      daily_rate: 90,
      license_plate: "test-1234",
      fine_amount: 90,
      brand: "test",
      category_id: "test-to-test",
    };

    await createCarUseCase.execute(car);

    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError("car alreary exists")
    );
  });

  it("All new cars has to have avaliability true", async () => {
    const car = await createCarUseCase.execute({
      name: "test",
      description: "test car",
      daily_rate: 90,
      license_plate: "test-9234",
      fine_amount: 90,
      brand: "test",
      category_id: "test-to-test",
    });

    expect(car.avaliable).toBe(true);
  });
});
