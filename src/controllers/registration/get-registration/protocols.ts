import { Registration } from "./../../../models/registration";

export interface IGetRegistrationRepository {
  getRegistrations(): Promise<Registration[]>;
}
