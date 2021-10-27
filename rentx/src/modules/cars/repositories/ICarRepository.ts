import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

import { Cars } from "../infra/typeorm/entities/Cars";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Cars>;

  findByName(name: string): Promise<Cars | undefined>;

  findByLicencePlate(licencePlate: string): Promise<Cars | undefined>;

  findAvaliable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Cars[] | undefined>;

  findById(car_id: string): Promise<Cars>;

  updateAvaliable(id: string, avaliable: boolean): Promise<void>;
}

export { ICarRepository, ICreateCarDTO };
