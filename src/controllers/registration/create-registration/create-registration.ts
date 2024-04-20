import { Registration } from "./../../../models/registration";
import { HttpRequest, IController } from "../../protocols";
import { HttpResponse } from "../../protocols";
import {
  CreateRegistrationParams,
  ICreateRegistrationRepository,
} from "./protocols";
import {
  badRequest,
  createLog,
  created,
  serverError,
  tokenValidation,
} from "../../helpers";

export class CreateRegistrationController implements IController {
  constructor(
    private readonly createRegistrationRepository: ICreateRegistrationRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateRegistrationParams>
  ): Promise<HttpResponse<Registration | string>> {
    try {
      createLog(`Registration create: ${JSON.stringify(httpRequest.body)}`);

      const requiredFields = ["user", "event", "registrationDate"];

      tokenValidation(httpRequest?.body?.token!);

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateRegistrationParams]) {
          return badRequest(`O campo ${field} é obrigatório.`);
        }
      }

      const { user, event, registrationDate } = httpRequest.body!;

      const registration =
        await this.createRegistrationRepository.createRegistration({
          user,
          event,
          registrationDate,
        });

      return created<Registration>(registration);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
