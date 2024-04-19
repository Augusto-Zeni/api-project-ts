import { MongoClient } from "../../database/mongo";
import {
  ILoginUserRepository,
  LoginUserParams,
} from "../../controllers/login-user/protocols";
import { MongoUser } from "../mongo-protocols";
import { User } from "../../models/user";
import { compare } from "bcryptjs";

export class MongoLoginUserRepository implements ILoginUserRepository {
  async login(params: LoginUserParams): Promise<User> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ username: params.username });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordValidation = await compare(params.password, user.password);

    if (!passwordValidation) {
      throw new Error("Invalid username or password");
    }

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
