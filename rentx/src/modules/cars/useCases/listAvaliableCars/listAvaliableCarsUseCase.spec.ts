import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "../createCar/createCarUseCase";
import { ListAvaliableCarUseCase } from "./listAvaliableCarsUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepository: CarRepositoryInMemory;
let listAvaliableCarUseCase: ListAvaliableCarUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepository);
    listAvaliableCarUseCase = new ListAvaliableCarUseCase(carRepository);
  });

  it("should be able to list all cars", async () => {
    const car1 = await createCarUseCase.execute({
      name: "test1",
      description: "test1 car",
      daily_rate: 90,
      license_plate: "test1-1234",
      fine_amount: 90,
      brand: "test1",
      category_id: "test1-to-test",
    });

    const cars = await listAvaliableCarUseCase.execulte({});

    expect(cars).toEqual([car1]);
  });

  it("should be able to list car by name", async () => {
    const car1 = await createCarUseCase.execute({
      name: "test1",
      description: "test1 car",
      daily_rate: 90,
      license_plate: "test1-1234",
      fine_amount: 90,
      brand: "test1",
      category_id: "test1-to-test",
    });

    const cars = await listAvaliableCarUseCase.execulte({
      name: car1.name,
    });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list car by brand", async () => {
    const car1 = await createCarUseCase.execute({
      name: "test1",
      description: "test1 car",
      daily_rate: 90,
      license_plate: "test1-1234",
      fine_amount: 90,
      brand: "test1",
      category_id: "test1-to-test",
    });

    const cars = await listAvaliableCarUseCase.execulte({
      brand: car1.brand,
    });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list car by category_id", async () => {
    const car1 = await createCarUseCase.execute({
      name: "test1",
      description: "test1 car",
      daily_rate: 90,
      license_plate: "test1-1234",
      fine_amount: 90,
      brand: "test1",
      category_id: "test1-to-test",
    });

    const cars = await listAvaliableCarUseCase.execulte({
      brand: car1.category_id,
    });

    expect(cars).toEqual([car1]);
  });
});
