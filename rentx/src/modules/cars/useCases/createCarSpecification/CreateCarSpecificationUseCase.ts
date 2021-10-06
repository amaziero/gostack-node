import { inject, injectable } from "tsyringe";

import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  car_id: string | undefined;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execulte({ car_id, specification_id }: IRequest): Promise<Cars> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car not fund");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specification_id
    );

    carExists.specifications = specifications as Specification[];

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
