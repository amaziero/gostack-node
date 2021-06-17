import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const { file } = request;

    const importCategoryUsecase = container.resolve(ImportCategoryUseCase);

    importCategoryUsecase.excute(file);

    return response.send();
  }
}

export { ImportCategoryController };
