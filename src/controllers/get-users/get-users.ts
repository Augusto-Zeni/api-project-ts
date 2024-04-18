import { HttpRequest, HttpResponse } from "./../protocols";
import { User } from "../../models/user";
import { serverError, ok, badRequest } from "../helpers";
import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      if (httpRequest?.body?.token != process.env.TOKEN) {
        return badRequest(`Access Denied.`);
      }

      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
