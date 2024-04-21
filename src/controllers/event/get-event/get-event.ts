import { HttpRequest, HttpResponse } from "../../protocols";
import { Event } from "../../../models/event";
import { serverError, ok, createLog } from "../../helpers";
import { IController } from "../../protocols";
import { IGetEventRepository } from "./protocols";

export class GetEventController implements IController {
  constructor(private readonly getEventRepository: IGetEventRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Event[] | string>> {
    try {
      createLog(`Event get`);

      const events = await this.getEventRepository.getEvents();

      return ok<Event[]>(events);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
