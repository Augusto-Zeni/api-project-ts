import { ObjectId } from "mongodb";
import {
  IUpdateEventRepository,
  UpdateEventParams,
} from "../../../controllers/event/update-event/protocols";
import { MongoClient } from "../../../database/mongo";
import { Event } from "../../../models/event";
import { MongoEvent } from "../../mongo-protocols";

export class MongoUpdateEventRepository implements IUpdateEventRepository {
  async updateEvent(id: string, params: UpdateEventParams): Promise<Event> {
    await MongoClient.db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const event = await MongoClient.db
      .collection<MongoEvent>("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      throw new Error("Event not updated.");
    }

    const { _id, ...rest } = event;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
