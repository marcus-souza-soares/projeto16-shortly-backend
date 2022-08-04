import { Router } from "express";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import { schemaSignin, schemaSignup } from "../schemas/authSchema.js";
import { SignIn, creatUser } from "../controllers/authController.js"

const router = Router();

router.post("/signup", schemaValidate(schemaSignup), creatUser);
router.post("/signin", schemaValidate(schemaSignin), SignIn);

export default router;