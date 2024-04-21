import { HttpRequest, IController } from "../../protocols";
import { Event } from "../../../models/event";
import { HttpResponse } from "../../protocols";
import { CreateEventParams, ICreateEventRepository } from "./protocols";
import { badRequest, createLog, created, serverError } from "../../helpers";

export class CreateEventController implements IController {
  constructor(private readonly createEventRepository: ICreateEventRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateEventParams>
  ): Promise<HttpResponse<Event | string>> {
    try {
      createLog(`Event create: ${JSON.stringify(httpRequest?.body)}`);

      const requiredFields = ["name", "location"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateEventParams]?.length) {
          return badRequest(`Field ${field} is required.`);
        }
      }

      const { name, location } = httpRequest.body!;

      const event = await this.createEventRepository.createEvent({
        name,
        location,
      });

      return created<Event>(event);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
