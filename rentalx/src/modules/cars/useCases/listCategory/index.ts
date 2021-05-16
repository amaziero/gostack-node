import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoriesController = new ListCategoryController(
  listCategoryUseCase
);

export { listCategoriesController };
