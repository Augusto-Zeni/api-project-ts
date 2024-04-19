import { User } from "../../../models/user";

export interface CreateUserParams {
  token?: string;
  username: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}