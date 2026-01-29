import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./error.middleware.js";

export const middleware = {
    logger: morgan(
        'combined'
    ),
    cors: cors(),
    helmet: helmet(),
    error: errorMiddleware,
}