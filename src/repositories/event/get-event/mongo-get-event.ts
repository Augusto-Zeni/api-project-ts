import { IGetEventRepository } from "../../../controllers/event/get-event/protocols";
import { MongoClient } from "../../../database/mongo";
import { Event } from "../../../models/event";
import { MongoEvent } from "../../mongo-protocols";

export class MongoGetEventRepository implements IGetEventRepository {
  async getEvents(): Promise<Event[]> {
    const events = await MongoClient.db
      .collection<MongoEvent>("events")
      .find({})
      .toArray();

    return events.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
