import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

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
