import { Attandance } from "../../../models/attandance";

export interface IDeleteAttandanceRepository {
  deleteAttandance(id: string): Promise<Attandance>;
}
