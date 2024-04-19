import { LoginUserController } from "./controllers/user/login-user/login-user";
import { UpdateUserController } from "./controllers/user/update-user/update-user";
import { MongoUpdateUserRepository } from "./repositories/user/update-user/mongo-update-user";
import { CreateUserController } from "./controllers/user/create-user/create-user";
import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/user/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/user/get-users/get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/user/create-user/mongo-create-user";
import { DeleteUserController } from "./controllers/user/delete-user/delete-user";
import { MongoDeleteUserRepository } from "./repositories/user/delete-user/mongo-delete-user";
import { MongoLoginUserRepository } from "./repositories/user/login-user/mongo-login-user";
import { MongoCreateEventRepository } from "./repositories/event/create-event/mongo-create-event";
import { CreateEventController } from "./controllers/event/create-event/create-event";
import { MongoGetEventRepository } from "./repositories/event/get-event/mongo-get-event";
import { GetEventController } from "./controllers/event/get-event/get-event";
import { MongoUpdateEventRepository } from "./repositories/event/update-event/mongo-update-event";
import { UpdateEventController } from "./controllers/event/update-event/update-event";
import { MongoDeleteEventRepository } from "./repositories/event/delete-event/mongo-delete-event";
import { DeleteEventController } from "./controllers/event/delete-event/delete-event";
import { MongoGetRegistrationRepository } from "./repositories/registration/get-registration/mongo-get-registration";
import { GetRegistrationController } from "./controllers/registration/get-registration/get-registration";
import { MongoCreateRegistrationRepository } from "./repositories/registration/create-registration/mongo-create-registration";
import { CreateRegistrationController } from "./controllers/registration/create-registration/create-registration";
import { DeleteRegistrationController } from "./controllers/registration/delete-registration/delete-registration";
import { MongoDeleteRegistrationRepository } from "./repositories/registration/delete-registration/mongo-delete-registration";
import { MongoGetAttandanceRepository } from "./repositories/attandance/get-attandance/mongo-get-attandance";
import { GetAttandanceController } from "./controllers/attandance/get-attandance/get-attandance";
import { MongoCreateAttandanceRepository } from "./repositories/attandance/create-attandance/mongo-create-attandance";
import { CreateAttandanceController } from "./controllers/attandance/create-attandance/create-attandance";
import { MongoDeleteAttandanceRepository } from "./repositories/attandance/delete-attandance/mongo-delete-attandance";
import { DeleteAttandanceController } from "./controllers/attandance/delete-attandance/delete-attandance";

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

  // Lista todos os eventos
  app.get("/events", async (req, res) => {
    const mongoGetEventRepository = new MongoGetEventRepository();

    const getEventController = new GetEventController(mongoGetEventRepository);

    const { body, statusCode } = await getEventController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Cria um evento
  app.post("/events", async (req, res) => {
    const mongoCreateEventRepository = new MongoCreateEventRepository();

    const createEventController = new CreateEventController(
      mongoCreateEventRepository
    );

    const { body, statusCode } = await createEventController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Atualiza um evento
  app.patch("/events/:id", async (req, res) => {
    const mongoUpdateEventRepository = new MongoUpdateEventRepository();

    const updateEventController = new UpdateEventController(
      mongoUpdateEventRepository
    );

    const { body, statusCode } = await updateEventController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // Deleta um evento
  app.delete("/events/:id", async (req, res) => {
    const mongoDeleteEventRepository = new MongoDeleteEventRepository();

    const deleteEventController = new DeleteEventController(
      mongoDeleteEventRepository
    );

    const { body, statusCode } = await deleteEventController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // Lista todas as inscricoes
  app.get("/registrations", async (req, res) => {
    const mongoGetRegistrationRepository = new MongoGetRegistrationRepository();

    const getRegistrationController = new GetRegistrationController(
      mongoGetRegistrationRepository
    );

    const { body, statusCode } = await getRegistrationController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Cria uma inscricao
  app.post("/registrations", async (req, res) => {
    const mongoCreateRegistrationRepository =
      new MongoCreateRegistrationRepository();

    const createRegistrationController = new CreateRegistrationController(
      mongoCreateRegistrationRepository
    );

    const { body, statusCode } = await createRegistrationController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Deleta uma inscricao
  app.delete("/registrations/:id", async (req, res) => {
    const mongoDeleteRegistrationRepository =
      new MongoDeleteRegistrationRepository();

    const deleteRegistrationController = new DeleteRegistrationController(
      mongoDeleteRegistrationRepository
    );

    const { body, statusCode } = await deleteRegistrationController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // Lista todas as presencas
  app.get("/attandences", async (req, res) => {
    const mongoGetAttandanceRepository = new MongoGetAttandanceRepository();

    const getAttandanceController = new GetAttandanceController(
      mongoGetAttandanceRepository
    );

    const { body, statusCode } = await getAttandanceController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Cria uma presenca
  app.post("/attandences", async (req, res) => {
    const mongoCreateAttandanceRepository =
      new MongoCreateAttandanceRepository();

    const createAttandanceController = new CreateAttandanceController(
      mongoCreateAttandanceRepository
    );

    const { body, statusCode } = await createAttandanceController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  // Deleta uma presenca
  app.delete("/attandances/:id", async (req, res) => {
    const mongoDeleteAttandanceRepository =
      new MongoDeleteAttandanceRepository();

    const deleteAttandanceController = new DeleteAttandanceController(
      mongoDeleteAttandanceRepository
    );

    const { body, statusCode } = await deleteAttandanceController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();
