import { AppError } from "@shared/Errors/AppError";

import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  private specification: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specification.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specification.find((spec) => spec.name === name);
  }

  async findByIds(
    ids: string[] | undefined
  ): Promise<Specification[] | undefined> {
    if (ids === undefined) {
      throw new AppError("id undefined");
    }
    const allSpecifications = this.specification.filter(
      (spec) => ids.includes(spec.id as string) // nào sei sei funciona
    );

    return allSpecifications;
  }
}

export { SpecificationRepositoryInMemory };
