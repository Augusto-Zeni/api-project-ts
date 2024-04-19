import { Attandance } from "./../../../models/attandance";
import { ObjectId } from "mongodb";
import { IDeleteRegistrationRepository } from "../../../controllers/registration/delete-registration/protocols";
import { MongoClient } from "../../../database/mongo";
import { Registration } from "../../../models/registration";
import { MongoAttandance, MongoRegistration } from "../../mongo-protocols";
import { MongoDeleteAttandanceRepository } from "../../attandance/delete-attandance/mongo-delete-attandance";

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

    const attendaces = await MongoClient.db
      .collection<MongoAttandance>("attandances")
      .find({ resgistration: id })
      .toArray();

    if (attendaces) {
      const mongoDeleteAttandanceRepository =
        new MongoDeleteAttandanceRepository();

      attendaces.map(({ _id }) =>
        mongoDeleteAttandanceRepository.deleteAttandance(_id.toHexString())
      );
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
