import { Router } from "express";
import uploadRoute from "./upload.js"

const router = Router();

router.use("/", uploadRoute);

export default router; 