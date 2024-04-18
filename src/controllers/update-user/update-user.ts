import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserController, IUpdateUserRepository } from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const { id } = httpRequest?.params;

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

      const user = await this.updateUserRepository.updateUser(
        id,
        httpRequest.body
      );

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
