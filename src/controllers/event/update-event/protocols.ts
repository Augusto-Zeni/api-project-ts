import { Event } from "../../../models/event";

export interface UpdateEventParams {
  token?: string;
  name?: string;
  location?: string;
}

export interface IUpdateEventRepository {
  updateEvent(id: string, params: UpdateEventParams): Promise<Event>;
}
