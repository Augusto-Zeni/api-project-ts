import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";
import { badRequest, ok, serverError } from "../helpers";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const { id } = httpRequest?.params;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing user id.");
      }

      if (httpRequest.body!.email) {
        const emailValid = validator.isEmail(httpRequest.body!.email);

        if (!emailValid) {
          return badRequest("Email is invalid.");
        }
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
