import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvaliableCarUseCase } from "./listAvaliableCarsUseCase";

class ListAvaliableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvaliableCarsUseCase = container.resolve(ListAvaliableCarUseCase);

    const cars = await listAvaliableCarsUseCase.execulte({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}

export { ListAvaliableCarsController };
