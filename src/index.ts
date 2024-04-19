import { LoginUserController } from "./controllers/login-user/login-user";
import { UpdateUserController } from "./controllers/update-user/update-user";
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { DeleteUserController } from "./controllers/delete-user/delete-user";
import { MongoDeleteUserRepository } from "./repositories/delete-user/mongo-delete-user";
import { MongoLoginUserRepository } from "./repositories/login-user/mongo-login-user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8000;

  await MongoClient.connect();

  // Lista todos os usuarios
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Cria um usuario
  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Atualiza um usuario
  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // Deleta um usuario
  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // Login
  app.get("/users/login", async (req, res) => {
    const mongoLoginUsersRepository = new MongoLoginUserRepository();

    const loginUserController = new LoginUserController(
      mongoLoginUsersRepository
    );

    const { body, statusCode } = await loginUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
