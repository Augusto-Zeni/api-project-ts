import { Attandance } from "../../../models/attandance";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteAttandanceRepository } from "./protocols";
import {
  badRequest,
  createLog,
  ok,
  serverError,
  tokenValidation,
} from "../../helpers";

export class DeleteAttandanceController implements IController {
  constructor(
    private readonly deleteAttandanceRepository: IDeleteAttandanceRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Attandance | string>> {
    try {
      createLog(`Attandance delete: ${JSON.stringify(httpRequest?.params)}`);

      const { id } = httpRequest?.params;

      tokenValidation(httpRequest.body.token);

      if (!id) {
        return badRequest("Missing attandance id.");
      }

      const attandance =
        await this.deleteAttandanceRepository.deleteAttandance(id);

      return ok<Attandance>(attandance);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
