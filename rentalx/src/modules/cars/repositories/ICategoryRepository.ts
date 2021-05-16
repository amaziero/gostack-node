import { ICreateCategoryDTO } from "../../../dtos/ICategoriesDTO";
import { Category } from "../model/Category";

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
