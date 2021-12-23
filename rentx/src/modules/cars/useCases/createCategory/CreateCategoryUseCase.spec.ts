import { AppError } from "@shared/Errors/AppError";

import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const categoryTest = {
      name: "test",
      description: "test",
    };

    await createCategoryUseCase.execute({
      name: categoryTest.name,
      description: categoryTest.description,
    });

    const findCategory = await categoriesRepositoryInMemory.findByName(
      categoryTest.name
    );

    expect(findCategory).toHaveProperty("id");
  });

  it("should not be able to create categories with same name", async () => {
    const categoryTest = {
      name: "test",
      description: "test",
    };

    await createCategoryUseCase.execute(categoryTest);

    await expect(createCategoryUseCase.execute(categoryTest)).rejects.toEqual(
      new AppError("Category already created")
    );
  });
});
