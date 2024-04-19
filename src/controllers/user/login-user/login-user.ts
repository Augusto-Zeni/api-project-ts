import { badRequest, serverError, ok, tokenValidation } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { ILoginUserRepository, LoginUserParams } from "./protocols";

export class LoginUserController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}
  async handle(
    httpRequest: HttpRequest<LoginUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      tokenValidation(body.token!);

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
