import { middleware } from "#middleware/middleware.js";
import router from "@/routes/index.js";
import express from "express";
import { db } from "@/lib/pg-promise.js";

const app = express();
const port = process.env.PORT ?? "9000";

app.use(middleware.cors);
app.use(middleware.helmet);
app.use(middleware.logger);
app.use(middleware.error);

// check database connection
try {
    const connection = await db.connect();
    console.log("Successfully connected to database!");
    connection.done();
} catch (err) {
    console.error("Failed connecting to database", err);
}

app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Response sent.");
});

app.get("/health", (req, res) => {
    res.send("API is healthy!");
    console.log(`Health check coming from: ${req.hostname}`)
})

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});

