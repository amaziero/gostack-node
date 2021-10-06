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
    id,
  }: ICreateCarDTO): Promise<Cars> {
    const car = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      id,
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

  async findAvaliable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Cars[] | undefined> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("avaliable = :avaliable", { avaliable: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Cars | undefined> {
    const car = await this.repository.findOne(car_id);

    return car;
  }
}

export { CarRepository };
