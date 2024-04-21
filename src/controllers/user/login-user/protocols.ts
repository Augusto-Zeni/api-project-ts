import { User } from "../../../models/user";

export interface LoginUserParams {
  username: string;
  password: string;
}

export interface ILoginUserRepository {
  login(params: LoginUserParams): Promise<User>;
}
