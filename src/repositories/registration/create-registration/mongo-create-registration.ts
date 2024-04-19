import { ObjectId } from "mongodb";
import {
  CreateRegistrationParams,
  ICreateRegistrationRepository,
} from "../../../controllers/registration/create-registration/protocols";
import { MongoClient } from "../../../database/mongo";
import { Registration } from "../../../models/registration";
import {
  MongoEvent,
  MongoRegistration,
  MongoUser,
} from "../../mongo-protocols";

export class MongoCreateRegistrationRepository
  implements ICreateRegistrationRepository
{
  async createRegistration(
    params: CreateRegistrationParams
  ): Promise<Registration> {
    const event = await MongoClient.db
      .collection<MongoEvent>("events")
      .findOne({ _id: new ObjectId(params.event) });

    if (!event) {
      throw new Error("Event not found.");
    }

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(params.user) });

    if (!user) {
      throw new Error("User not found.");
    }

    const { insertedId } = await MongoClient.db
      .collection("registrations")
      .insertOne(params);

    const registration = await MongoClient.db
      .collection<MongoRegistration>("registrations")
      .findOne({ _id: insertedId });

    if (!registration) {
      throw new Error("Registration not created!");
    }

    const { _id, ...rest } = registration;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
