import { badRequest, serverError, ok, createLog } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { ILoginUserRepository, LoginUserParams } from "./protocols";

export class LoginUserController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}
  async handle(
    httpRequest: HttpRequest<LoginUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      createLog(`User login: ${JSON.stringify(httpRequest.body)}`);

      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      const allowedFieldsToUpdate: (keyof LoginUserParams)[] = [
        "username",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some((key) => {
        !allowedFieldsToUpdate.includes(key as keyof LoginUserParams);
      });

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const { username, password } = body!;

      const user = await this.loginUserRepository.login({
        username,
        password,
      });

      return ok(user);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
