import { Registration } from "../../../models/registration";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteRegistrationRepository } from "./protocols";
import { badRequest, createLog, ok, serverError } from "../../helpers";

export class DeleteRegistrationController implements IController {
  constructor(
    private readonly deleteRegistrationRepository: IDeleteRegistrationRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Registration | string>> {
    try {
      createLog(`Registration delete: ${JSON.stringify(httpRequest.body)}`);

      const { id } = httpRequest?.params;

      if (!id) {
        return badRequest("Missing registration id.");
      }

      const registration =
        await this.deleteRegistrationRepository.deleteRegistration(id);

      return ok<Registration>(registration);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
