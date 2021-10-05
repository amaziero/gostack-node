import { inject, injectable } from "tsyringe";

import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvaliableCarUseCase {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository
  ) {}
  async execulte({
    name,
    brand,
    category_id,
  }: IRequest): Promise<Cars[] | undefined> {
    const cars: Cars[] | undefined = await this.carsRepository.findAvaliable(
      brand,
      category_id,
      name
    );

    if (cars === undefined) {
      throw new AppError("There are no cars to list");
    }

    return cars;
  }
}

export { ListAvaliableCarUseCase };
