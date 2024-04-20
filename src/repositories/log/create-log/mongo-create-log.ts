import {
  CreateLogParams,
  ICreateLogRepository,
} from "../../../controllers/log/create-log/protocols";
import { MongoClient } from "../../../database/mongo";
import { Log } from "../../../models/log";
import { MongoLog } from "../../mongo-protocols";

export class MongoCreateLogRepository implements ICreateLogRepository {
  async createLog(params: CreateLogParams): Promise<string> {
    const { insertedId } = await MongoClient.db
      .collection("logs")
      .insertOne(params);

    const log = await MongoClient.db
      .collection<MongoLog>("logs")
      .findOne({ _id: insertedId });

    if (!log) {
      throw new Error("Log not created!");
    }

    return "ok";
  }
}
