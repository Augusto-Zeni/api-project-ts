import { HttpRequest, HttpResponse } from "../../protocols";
import { User } from "../../../models/user";
import { serverError, ok, tokenValidation, createLog } from "../../helpers";
import { IController } from "../../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User[] | string>> {
    try {
      createLog(`User get`);

      const users = await this.getUsersRepository.getUsers();

      tokenValidation(httpRequest.body.token);

      return ok<User[]>(users);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
