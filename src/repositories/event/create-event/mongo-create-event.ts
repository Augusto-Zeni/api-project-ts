import {
  CreateEventParams,
  ICreateEventRepository,
} from "../../../controllers/event/create-event/protocols";
import { MongoClient } from "../../../database/mongo";
import { Event } from "../../../models/event";
import { MongoEvent } from "../../mongo-protocols";

export class MongoCreateEventRepository implements ICreateEventRepository {
  async createEvent(params: CreateEventParams): Promise<Event> {
    const { insertedId } = await MongoClient.db
      .collection("events")
      .insertOne(params);

    const event = await MongoClient.db
      .collection<MongoEvent>("events")
      .findOne({ _id: insertedId });

    if (!event) {
      throw new Error("Event not created!");
    }

    const { _id, ...rest } = event;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
