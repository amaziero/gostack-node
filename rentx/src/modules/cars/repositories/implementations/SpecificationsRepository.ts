import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specification: Specification[];

  constructor() {
    this.specification = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specification.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specification.find(
      (speci) => speci.name === name
    );

    if (!specification) {
      throw new Error("Could not find this specification");
    }

    return specification;
  }
}

export { SpecificationsRepository };
