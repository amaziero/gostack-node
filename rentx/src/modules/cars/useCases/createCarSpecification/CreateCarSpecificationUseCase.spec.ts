import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/Errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepository: SpecificationRepositoryInMemory;
let carRepository: CarRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    specificationsRepository = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepository,
      specificationsRepository
    );
  });

  it("should not be able to add a new specification to the car which not exists", async () => {
    const car_id = "1324";
    const specification_id = ["1234"];

    expect(async () => {
      await createCarSpecificationUseCase.execulte({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepository.create({
      name: "test1",
      description: "test1 car",
      daily_rate: 90,
      license_plate: "test1-1234",
      fine_amount: 90,
      brand: "test1",
      category_id: "test1-to-test",
    });

    if (!car.id) {
      throw new AppError("car not found");
    }

    const specification = await specificationsRepository.create({
      description: "test",
      name: "test",
    });

    const specification_id = [specification.id as string];

    if (specification_id === undefined) {
      throw new AppError("");
    }

    const specificationCars = await createCarSpecificationUseCase.execulte({
      car_id: car.id,
      specification_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});
