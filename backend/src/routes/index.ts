import { Router } from "express";

import imagesRouter from "./images/index.js"

const router = Router();

router.use("/image", imagesRouter);

export default router;
