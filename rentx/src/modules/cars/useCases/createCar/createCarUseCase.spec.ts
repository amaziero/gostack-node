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

    expect(searchCar).toHaveProperty("name");
  });
});
