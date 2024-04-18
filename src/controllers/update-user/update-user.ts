import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const { id } = httpRequest?.params;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields.",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id.",
        };
      }

      if (httpRequest.body!.email) {
        const emailValid = validator.isEmail(httpRequest.body!.email);

        if (!emailValid) {
          return {
            statusCode: 400,
            body: `Email is invalid.`,
          };
        }
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
