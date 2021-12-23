import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { AppError } from "@shared/Errors/AppError";

import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {
  private cars: Cars[] = [];

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

  async findAvaliable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Cars[] | undefined> {
    const cars = this.cars.filter((car) => {
      if (
        car.avaliable === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return undefined;
    });

    return cars;
  }

  async findById(car_id: string): Promise<Cars> {
    const searchCar = this.cars.find((car) => car.id === car_id);

    if (!searchCar) {
      throw new AppError("can't find car");
    }

    return searchCar;
  }

  async updateAvaliable(id: string, avaliable: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].avaliable = avaliable;
  }
}

export { CarRepositoryInMemory };
