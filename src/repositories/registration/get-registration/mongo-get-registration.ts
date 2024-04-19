import { IGetRegistrationRepository } from "../../../controllers/registration/get-registration/protocols";
import { MongoClient } from "../../../database/mongo";
import { Registration } from "../../../models/registration";
import { MongoRegistration } from "../../mongo-protocols";

export class MongoGetRegistrationRepository
  implements IGetRegistrationRepository
{
  async getRegistrations(): Promise<Registration[]> {
    const registrations = await MongoClient.db
      .collection<MongoRegistration>("registrations")
      .find({})
      .toArray();

    return registrations.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
