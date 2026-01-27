import { Router } from "express";
import imageRoute from "./crud.js"
import metadataRoute from "./metadata.js"
import adminRoute from "./admin.js"

const router = Router();

router.use("/crud", imageRoute);
router.use("/metadata", metadataRoute);
router.use("/admin", adminRoute)

export default router; 