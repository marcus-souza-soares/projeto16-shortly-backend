import { Router } from "express";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import { schemaSignup } from "../schemas/authSchema.js";
import { teste } from "../controllers/authController.js"

const router = Router();

router.post("/signup", schemaValidate(schemaSignup), teste)

export default router;