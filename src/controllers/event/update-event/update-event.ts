import validator from "validator";
import { Event } from "../../../models/event";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateEventRepository, UpdateEventParams } from "./protocols";
import { badRequest, createLog, ok, serverError } from "../../helpers";
import { hash, genSalt } from "bcryptjs";

export class UpdateEventController implements IController {
  constructor(private readonly updateEventRepository: IUpdateEventRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateEventParams>
  ): Promise<HttpResponse<Event | string>> {
    try {
      createLog(`Event update: ${JSON.stringify(httpRequest.body)}`);

      const { id } = httpRequest?.params;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing event id.");
      }

      const updateData: Partial<UpdateEventParams> = {};

      if (httpRequest.body!.location) {
        updateData.location = httpRequest.body!.location;
      }

      if (httpRequest.body!.name) {
        updateData.name = httpRequest.body!.name;
      }

      const event = await this.updateEventRepository.updateEvent(
        id,
        updateData
      );

      return ok<Event>(event);
    } catch (error) {
      return serverError(`${error}`);
    }
  }
}
