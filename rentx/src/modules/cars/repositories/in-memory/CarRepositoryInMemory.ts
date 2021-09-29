import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {
  cars: Cars[] = [];

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Cars> {
    const car = new Cars();

    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByName(name: string): Promise<Cars | undefined> {
    const searchCar = this.cars.find((car) => car.name === name);

    return searchCar;
  }

  async findByLicencePlate(licencePlate: string): Promise<Cars | undefined> {
    const searchCar = this.cars.find(
      (car) => car.license_plate === licencePlate
    );

    return searchCar;
  }
}

export { CarRepositoryInMemory };
