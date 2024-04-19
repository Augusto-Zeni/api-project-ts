import { Event } from "./../models/event";
import { User } from "../models/user";

export type MongoUser = Omit<User, "id">;

export type MongoEvent = Omit<Event, "id">;
