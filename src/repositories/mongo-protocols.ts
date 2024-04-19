import { Event } from "./../models/event";
import { User } from "../models/user";
import { Registration } from "../models/registration";
import { Attandance } from "../models/attandance";

export type MongoUser = Omit<User, "id">;

export type MongoEvent = Omit<Event, "id">;

export type MongoRegistration = Omit<Registration, "id">;

export type MongoAttandance = Omit<Attandance, "id">;
