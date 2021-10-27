import { getRepository, Repository } from "typeorm";

import { AppError } from "@shared/Errors/AppError";

import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { IRentalRepository } from "../../repositories/IRentalRepository";
import { Rental } from "../typeorm/entities/Rental";

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ car_id });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ user_id });
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const createRental = {
      user_id,
      car_id,
      expected_return_date,
    };

    const rental = this.repository.create(createRental);

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id });

    if (!rental) {
      throw new AppError("can't find rental informed");
    }

    return rental;
  }
}

export { RentalRepository };
