import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const carImageRepository = container.resolve(UploadCarImagesUseCase);

    const fileNames = images.map((file) => file.filename);

    carImageRepository.execute({ car_id: id, images_name: fileNames });

    return response.status(201);
  }
}

export { UploadCarImagesController };
