import { MongoCreateLogRepository } from "../repositories/log/create-log/mongo-create-log";
import { CreateLogController } from "./log/create-log/create-log";
import { HttpResponse, HttpStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: message,
});

export const serverError = (error: string): HttpResponse<string> => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: error,
});

export const tokenValidation = (token: string) => {
  if (token != process.env.TOKEN) {
    throw new Error("Access Denied.");
  }
};

export const createLog = (message: string) => {
  const mongoCreateLogRepository = new MongoCreateLogRepository();

  const createLogController = new CreateLogController(mongoCreateLogRepository);

  createLogController.handle(message);
};
