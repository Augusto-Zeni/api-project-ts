import { Event } from "./../../../models/event";

export interface IGetEventRepository {
  getEvents(): Promise<Event[]>;
}
