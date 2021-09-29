import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

import { Cars } from "../infra/typeorm/entities/Cars";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Cars>;

  findByName(name: string): Promise<Cars | undefined>;

  findByLicencePlate(licencePlate: string): Promise<Cars | undefined>;
}

export { ICarRepository, ICreateCarDTO };
