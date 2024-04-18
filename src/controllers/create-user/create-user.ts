import validator from "validator";
import { HttpRequest, IController } from "./../protocols";
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["username", "email"];

      if (httpRequest?.body?.token != process.env.TOKEN) {
        return badRequest(`Access Denied.`);
      }

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required.`);
        }
      }

      const emailValid = validator.isEmail(httpRequest.body!.email);

      if (!emailValid) {
        return badRequest("Email is invalid.");
      }

      const { username, email } = httpRequest.body!;

      const user = await this.createUserRepository.createUser({
        username,
        email,
      });

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
