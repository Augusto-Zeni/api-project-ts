import { Attandance } from "../../../models/attandance";

export interface IGetAttandanceRepository {
  getAttandances(): Promise<Attandance[]>;
}
