import { ObjectId } from "mongodb";
import { IDeleteEventRepository } from "../../../controllers/event/delete-event/protocols";
import { MongoClient } from "../../../database/mongo";
import { Event } from "../../../models/event";
import {
  MongoEvent,
  MongoRegistration,
  MongoUser,
} from "../../mongo-protocols";
import { MongoDeleteRegistrationRepository } from "../../registration/delete-registration/mongo-delete-registration";

export class MongoDeleteEventRepository implements IDeleteEventRepository {
  async deleteEvent(id: string): Promise<Event> {
    const event = await MongoClient.db
      .collection<MongoEvent>("events")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      throw new Error("Event not found.");
    }

    const registrations = await MongoClient.db
      .collection<MongoRegistration>("registrations")
      .find({ event: id })
      .toArray();

    if (registrations) {
      const mongoDeleteRegistrationRepository =
        new MongoDeleteRegistrationRepository();

      registrations.map(({ _id }) =>
        mongoDeleteRegistrationRepository.deleteRegistration(_id.toHexString())
      );
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
