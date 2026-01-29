import { NextFunction, Response, Request } from "express";
import { HttpError } from "http-errors";

function errorMiddleware(err: HttpError, request: Request, response: Response, next: NextFunction) {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const message = err.message ? err.message : `Something went wrong!`;
    response.status(statusCode).send({statusCode, message, error: err});
}