import { Event } from "../../../models/event";

export interface CreateEventParams {
  token?: string;
  name: string;
  location: string;
}

export interface ICreateEventRepository {
  createEvent(params: CreateEventParams): Promise<Event>;
}
