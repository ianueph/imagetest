import express from "express";
import imagesRouter from "./images/index.js";

const router = express.Router();

router.use("/images", imagesRouter);

export { router };

