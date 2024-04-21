import { NextFunction, Request, Response } from "express";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).send("Access Denied.");
  }

  const [, user] = token.split(" ");

  if (user === process.env.TOKEN) {
    return next();
  }

  return response.status(401).send("Access Denied.");
}
