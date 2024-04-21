import { Event } from "../../../models/event";

export interface CreateEventParams {
  name: string;
  location: string;
}

export interface ICreateEventRepository {
  createEvent(params: CreateEventParams): Promise<Event>;
}
