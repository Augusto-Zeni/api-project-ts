import { Registration } from "../../../models/registration";

export interface CreateRegistrationParams {
  user: string;
  event: string;
  registrationDate: Date;
}

export interface ICreateRegistrationRepository {
  createRegistration(params: CreateRegistrationParams): Promise<Registration>;
}
