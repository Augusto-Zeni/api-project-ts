import { Event } from "../../../models/event";

export interface IDeleteEventRepository {
  deleteEvent(id: string): Promise<Event>;
}
