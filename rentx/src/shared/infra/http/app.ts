import "reflect-metadata";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/Errors/AppError";
import "@shared/infra/typeorm/index";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import "@shared/container";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(router);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
