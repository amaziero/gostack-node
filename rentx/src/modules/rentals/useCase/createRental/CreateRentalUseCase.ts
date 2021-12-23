import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    // Gets in only if already has an rental for car in the same time
    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    // Gets in only if already has an rental for user in the same time
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress to this user");
    }

    const compare = this.dateProvider.comparInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (minimumHour < compare) {
      throw new AppError("Rental can't last less than 24 hours");
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carRepository.updateAvaliable(rental.car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
