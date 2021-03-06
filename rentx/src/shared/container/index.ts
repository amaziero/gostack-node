import { container } from "tsyringe";

import "@shared/container/providers";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarImageRepository";
import { RentalRepository } from "@modules/rentals/infra/repositories/RentalRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepositories";
import { ICarRepository } from "../../modules/cars/repositories/ICarRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UserRepository
);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UsersTokenRepository
);
