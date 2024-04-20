export interface CreateLogParams {
  message: string;
  timestamp: Date;
}

export interface ICreateLogRepository {
  createLog(params: CreateLogParams): Promise<string>;
}
