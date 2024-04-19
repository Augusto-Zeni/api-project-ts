import { ObjectId } from "mongodb";
import { IDeleteEventRepository } from "../../../controllers/event/delete-event/protocols";
import { MongoClient } from "../../../database/mongo";
import { Event } from "../../../models/event";
import { MongoEvent } from "../../mongo-protocols";

export class MongoDeleteEventRepository implements IDeleteEventRepository {
  async deleteEvent(id: string): Promise<Event> {
    const event = await MongoClient.db
      .collection<MongoEvent>("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      throw new Error("Event not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection("events")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Event not deleted.");
    }

    const { _id, ...rest } = event;

    return { id: _id.toHexString(), ...rest };
  }
}
