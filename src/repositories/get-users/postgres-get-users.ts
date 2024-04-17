import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class PostgresGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        id: 1,
        username: "zeni",
        email: "zeni@gmail.com",
      },
    ];
  }
}