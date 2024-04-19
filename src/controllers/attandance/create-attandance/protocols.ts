import { Attandance } from "../../../models/attandance";

export interface CreateAttandanceParams {
  token?: string;
  resgistration: string;
  attandanceDate: Date;
}

export interface ICreateAttandanceRepository {
  createAttandance(params: CreateAttandanceParams): Promise<Attandance>;
}
