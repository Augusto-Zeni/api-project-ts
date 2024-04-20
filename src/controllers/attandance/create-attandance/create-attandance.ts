import { Attandance } from "../../../models/attandance";
import { HttpRequest, IController } from "../../protocols";
import { HttpResponse } from "../../protocols";
import {
  CreateAttandanceParams,
  ICreateAttandanceRepository,
} from "./protocols";
import {
  badRequest,
  createLog,
  created,
  serverError,
  tokenValidation,
} from "../../helpers";

export class CreateAttandanceController implements IController {
  constructor(
    private readonly createAttandanceRepository: ICreateAttandanceRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateAttandanceParams>
  ): Promise<HttpResponse<Attandance | string>> {
    try {
      createLog(`Attandance create: ${JSON.stringify(httpRequest?.body)}`);

      const requiredFields = ["resgistration", "attandanceDate"];

      tokenValidation(httpRequest?.body?.token!);

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateAttandanceParams]) {
          return badRequest("O campo ${field} é obrigatório.");
        }
      }

      const { resgistration, attandanceDate } = httpRequest.body!;

      const attandance = await this.createAttandanceRepository.createAttandance(
        {
          resgistration,
          attandanceDate,
        }
      );

      return created<Attandance>(attandance);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
