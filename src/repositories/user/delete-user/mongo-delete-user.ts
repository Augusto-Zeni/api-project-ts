import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../../controllers/user/delete-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoRegistration, MongoUser } from "../../mongo-protocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found.");
    }

    const registrations = await MongoClient.db
      .collection<MongoRegistration>("registrations")
      .find({ user: id })
      .toArray();

    if (registrations) {
      const registrationIds = registrations.map(
        (registration: MongoRegistration) => registration.event
      );
      await MongoClient.db
        .collection("registrations")
        .deleteMany({ event: { $in: registrationIds } });
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted.");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
