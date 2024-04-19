import { IGetAttandanceRepository } from "../../../controllers/attandance/get-attandance/protocols";
import { MongoClient } from "../../../database/mongo";
import { Attandance } from "../../../models/attandance";
import { MongoAttandance } from "../../mongo-protocols";

export class MongoGetAttandanceRepository implements IGetAttandanceRepository {
  async getAttandances(): Promise<Attandance[]> {
    const attandances = await MongoClient.db
      .collection<MongoAttandance>("attandances")
      .find({})
      .toArray();

    return attandances.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
