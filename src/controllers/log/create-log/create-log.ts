import { ICreateLogRepository } from "./protocols";

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
