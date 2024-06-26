import { Event } from "../../../models/event";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteEventRepository } from "./protocols";
import { badRequest, createLog, ok, serverError } from "../../helpers";

export class DeleteEventController implements IController {
  constructor(private readonly deleteEventRepository: IDeleteEventRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Event | string>> {
    try {
      createLog(`Event delete: ${JSON.stringify(httpRequest?.body)}`);

      const { id } = httpRequest?.params;

      if (!id) {
        return badRequest("Missing event id.");
      }

      const event = await this.deleteEventRepository.deleteEvent(id);

      return ok<Event>(event);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
