import { inject, injectable } from "tsyringe";

import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { Rental } from "../../infra/typeorm/entities/Rental";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) { }

  async execulte({ user_id }: IRequest): Promise<Rental[]> {
    const rentalsByUser = await this.rentalRepository.findByUserId(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
