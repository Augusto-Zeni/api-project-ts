import { User } from "../../models/user";

export interface CreateUserParams {
  username: string;
  email: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
