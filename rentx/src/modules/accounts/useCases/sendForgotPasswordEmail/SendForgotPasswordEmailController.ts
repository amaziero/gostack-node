import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordEmailUseCase } from "./SendForgotPasswordEmailUseCase";

class SendForgotPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordEmailUseCase
    );

    await sendForgotPasswordMailUseCase.execulte(email);

    return response.send();
  }
}

export { SendForgotPasswordEmailController };
