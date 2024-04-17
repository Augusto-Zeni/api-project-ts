import express from "express";
import { config } from "dotenv";
import { PostgresGetUsersRepository } from "./repositories/get-users/postgres-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";

config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/users", async (req, res) => {
  const postgresGetUsersRepository = new PostgresGetUsersRepository();

  const getUsersController = new GetUsersController(postgresGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
