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

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    if (!openByCar) {
      throw new AppError("cant find car");
    }

    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    if (!openByUser) {
      throw new AppError("cant find car");
    }

    return openByUser;
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const createRental = {
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
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
