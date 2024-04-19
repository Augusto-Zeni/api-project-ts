import { Registration } from "../../../models/registration";

export interface IDeleteRegistrationRepository {
  deleteRegistration(id: string): Promise<Registration>;
}
