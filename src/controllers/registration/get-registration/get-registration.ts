import { HttpRequest, HttpResponse } from "../../protocols";
import { Registration } from "../../../models/registration";
import { serverError, ok, tokenValidation, createLog } from "../../helpers";
import { IController } from "../../protocols";
import { IGetRegistrationRepository } from "./protocols";

export class GetRegistrationController implements IController {
  constructor(
    private readonly getRegistrationRepository: IGetRegistrationRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Registration[] | string>> {
    try {
      createLog(`Registration get`);

      const registrations =
        await this.getRegistrationRepository.getRegistrations();

      tokenValidation(httpRequest.body.token);

      return ok<Registration[]>(registrations);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
