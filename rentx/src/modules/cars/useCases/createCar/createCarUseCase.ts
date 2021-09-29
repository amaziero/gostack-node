import { injectable, inject } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

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
    await this.carRepository.create(data);
  }
}

export { CreateCarUseCase };
