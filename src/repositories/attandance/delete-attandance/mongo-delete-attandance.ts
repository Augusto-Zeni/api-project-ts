import { ObjectId } from "mongodb";
import { IDeleteAttandanceRepository } from "../../../controllers/attandance/delete-attandance/protocols";
import { MongoClient } from "../../../database/mongo";
import { Attandance } from "../../../models/attandance";
import { MongoAttandance } from "../../mongo-protocols";

export class MongoDeleteAttandanceRepository
  implements IDeleteAttandanceRepository
{
  async deleteAttandance(id: string): Promise<Attandance> {
    const attandance = await MongoClient.db
      .collection<MongoAttandance>("attandances")
      .findOne({ _id: new ObjectId(id) });

    if (!attandance) {
      throw new Error("Attandance not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection("attandances")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Attandance not deleted.");
    }

    const { _id, ...rest } = attandance;

    return { id: _id.toHexString(), ...rest };
  }
}
