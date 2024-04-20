import { User } from "../../../models/user";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteUserRepository } from "./protocols";
import {
  badRequest,
  createLog,
  ok,
  serverError,
  tokenValidation,
} from "../../helpers";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      createLog(`User delete: ${JSON.stringify(httpRequest.body)}`);

      const { id } = httpRequest?.params;

      tokenValidation(httpRequest.body.token);

      if (!id) {
        return badRequest("Missing user id.");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(user);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
