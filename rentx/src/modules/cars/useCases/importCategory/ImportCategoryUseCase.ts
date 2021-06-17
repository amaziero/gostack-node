import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const category: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          category.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(category);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async excute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
