import { injectable, inject } from "tsyringe";

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
  async execute(data: IRequest): Promise<void> {
    const searchCar = await this.carRepository.findByLicencePlate(
      data.license_plate
    );

    if (!searchCar === undefined) {
      throw new AppError("car alreary exists");
    }

    await this.carRepository.create(data);
  }
}

export { CreateCarUseCase };
