import { Event } from "./../models/event";
import { User } from "../models/user";
import { Registration } from "../models/registration";

export type MongoUser = Omit<User, "id">;

export type MongoEvent = Omit<Event, "id">;

export type MongoRegistration = Omit<Registration, "id">;
