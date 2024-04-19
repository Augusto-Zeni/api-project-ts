import validator from "validator";
import { HttpRequest, IController } from "./../protocols";
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";
import { hash, genSalt } from "bcryptjs";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["username", "email", "password"];

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

      const { username, email, password } = httpRequest.body!;

      const salt = await genSalt(10);
      const passwordHash = await hash(password, salt);

      const user = await this.createUserRepository.createUser({
        username,
        email,
        password: passwordHash,
      });

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
