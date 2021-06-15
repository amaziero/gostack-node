import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export default (): ListCategoryController => {
  const categoriesRepository = new CategoriesRepository();

  const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoryController(
    listCategoryUseCase
  );

  return listCategoriesController;
};
