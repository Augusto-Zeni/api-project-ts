import { ObjectId } from "mongodb";
import { IDeleteRegistrationRepository } from "../../../controllers/registration/delete-registration/protocols";
import { MongoClient } from "../../../database/mongo";
import { Registration } from "../../../models/registration";
import { MongoRegistration } from "../../mongo-protocols";

export class MongoDeleteRegistrationRepository
  implements IDeleteRegistrationRepository
{
  async deleteRegistration(id: string): Promise<Registration> {
    const registration = await MongoClient.db
      .collection<MongoRegistration>("registrations")
      .findOne({ _id: new ObjectId(id) });

    if (!registration) {
      throw new Error("Registration not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection("registrations")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Registration not deleted.");
    }

    const { _id, ...rest } = registration;

    return { id: _id.toHexString(), ...rest };
  }
}
