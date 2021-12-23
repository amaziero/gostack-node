import { injectable, inject } from "tsyringe";

import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}
  async execute(data: IRequest): Promise<Cars> {
    const searchCar = await this.carRepository.findByLicencePlate(
      data.license_plate
    );

    if (searchCar) {
      throw new AppError("car alreary exists");
    }

    const car = await this.carRepository.create(data);

    return car;
  }
}

export { CreateCarUseCase };
