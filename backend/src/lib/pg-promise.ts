import pgPromise from "pg-promise";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset.js";

const pgp = pgPromise();

const cn : IConnectionParameters = {
    host: process.env.PG_HOST ?? "localhost",
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    max: 30 // use up to 30 connections
}

const db = pgp(cn);

export { db };