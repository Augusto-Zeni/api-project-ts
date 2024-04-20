import { HttpRequest, IController } from "../../protocols";
import { Log } from "../../../models/log";
import { HttpResponse } from "../../protocols";
import { CreateLogParams, ICreateLogRepository } from "./protocols";
import {
  badRequest,
  created,
  serverError,
  tokenValidation,
} from "../../helpers";

export class CreateLogController {
  constructor(private readonly createLogRepository: ICreateLogRepository) {}

  async handle(message: string) {
    try {
      const timestamp: Date = new Date();

      const log = await this.createLogRepository.createLog({
        message,
        timestamp,
      });

      return "ok";
    } catch (error) {
      return "Something went wrong.";
    }
  }
}
