import { AppError } from "@shared/Errors/AppError";

import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    if (!rental) {
      throw new AppError("cant find rental");
    }

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    if (!rental) {
      throw new AppError("cant find rental");
    }

    return rental;
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    if (!rental) {
      throw new AppError("can't find rental informed");
    }

    return rental;
  }

  async findByUserId(id: string): Promise<Rental[]> {
    const rentals = this.rentals.find((rental) => rental.id === id);

    if (!rentals) {
      throw new AppError("can't find rental informed");
    }

    return rentals;
  }
}

export { RentalRepositoryInMemory };
