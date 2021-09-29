import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

import { Cars } from "../entities/Cars";

class CarRepository implements ICarRepository {
  private repository: Repository<Cars>;

  constructor() {
    this.repository = getRepository(Cars);
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Cars> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }

  async findByName(name: string): Promise<Cars | undefined> {
    const car = await this.repository.findOne({ name });

    return car;
  }

  async findByLicencePlate(licencePlate: string): Promise<Cars | undefined> {
    const car = await this.repository.findOne(licencePlate);

    return car;
  }
}

export { CarRepository };