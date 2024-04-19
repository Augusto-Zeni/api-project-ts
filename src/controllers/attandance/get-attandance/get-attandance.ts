import { HttpRequest, HttpResponse } from "../../protocols";
import { Attandance } from "../../../models/attandance";
import { serverError, ok, tokenValidation } from "../../helpers";
import { IController } from "../../protocols";
import { IGetAttandanceRepository } from "./protocols";

export class GetAttandanceController implements IController {
  constructor(
    private readonly getAttandanceRepository: IGetAttandanceRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Attandance[] | string>> {
    try {
      const attandances = await this.getAttandanceRepository.getAttandances();

      tokenValidation(httpRequest.body.token);

      return ok<Attandance[]>(attandances);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
