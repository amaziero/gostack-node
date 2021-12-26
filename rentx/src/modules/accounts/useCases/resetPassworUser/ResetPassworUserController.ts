import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPassworUserUseCase } from "./ResetPassworUserUseCase";

class ResetPassworUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPassworUserUseCase = container.resolve(ResetPassworUserUseCase);
    await resetPassworUserUseCase.execulte({ token: String(token), password });

    return response.send();
  }
}

export { ResetPassworUserController };
