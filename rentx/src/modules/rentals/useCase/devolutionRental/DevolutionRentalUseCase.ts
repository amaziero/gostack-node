import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/Errors/AppError";

interface IRequest {
  rental_id: string;
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,

    @inject("CarRepository")
    private carRepository: ICarRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execulte({ id, rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carRepository.findById(rental_id);
    const mininumDaily = 1;

    if (!rental) {
      throw new AppError("Can't find the rental informed");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.comparInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = mininumDaily;
    }

    const delay = this.dateProvider.comparInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvaliable(rental.car_id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
