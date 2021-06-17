import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("CategoriesRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  execute({ name, description }: IRequest): void {
    const specificatonAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificatonAlreadyExists) {
      throw new Error(
        `Specification already existis with id ${specificatonAlreadyExists.id}`
      );
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
