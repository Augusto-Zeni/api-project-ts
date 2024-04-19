import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { Attandance } from "../../../models/attandance";
import { MongoAttandance, MongoRegistration } from "../../mongo-protocols";
import {
  CreateAttandanceParams,
  ICreateAttandanceRepository,
} from "../../../controllers/attandance/create-attandance/protocols";

export class MongoCreateAttandanceRepository
  implements ICreateAttandanceRepository
{
  async createAttandance(params: CreateAttandanceParams): Promise<Attandance> {
    const resgistration = await MongoClient.db
      .collection<MongoRegistration>("registrations")
      .findOne({ _id: new ObjectId(params.resgistration) });

    if (!resgistration) {
      throw new Error("Resgistration not found.");
    }

    const { insertedId } = await MongoClient.db
      .collection("attandances")
      .insertOne(params);

    const attandance = await MongoClient.db
      .collection<MongoAttandance>("attandances")
      .findOne({ _id: insertedId });

    if (!attandance) {
      throw new Error("Attandance not created!");
    }

    const { _id, ...rest } = attandance;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
