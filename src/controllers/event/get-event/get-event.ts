import { HttpRequest, HttpResponse } from "../../protocols";
import { Event } from "../../../models/event";
import { serverError, ok, tokenValidation } from "../../helpers";
import { IController } from "../../protocols";
import { IGetEventRepository } from "./protocols";

export class GetEventController implements IController {
  constructor(private readonly getEventRepository: IGetEventRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Event[] | string>> {
    try {
      const events = await this.getEventRepository.getEvents();

      tokenValidation(httpRequest.body.token);

      return ok<Event[]>(events);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
