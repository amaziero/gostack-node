import { Cars } from "../infra/typeorm/entities/Cars";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<void>;

  findByName(name: string): Promise<Cars | undefined>;
}

export { ICarRepository, ICreateCarDTO };
