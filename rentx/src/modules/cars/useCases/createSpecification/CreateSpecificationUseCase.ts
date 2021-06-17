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

  async execute({ name, description }: IRequest): Promise<void> {
    const specificatonAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificatonAlreadyExists) {
      throw new Error(`Specification already existis!`);
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
