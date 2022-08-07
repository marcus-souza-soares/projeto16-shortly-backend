import { Router } from "express";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import { schemaSignin, schemaSignup } from "../schemas/authSchema.js";
import { SignIn, creatUser, getUserUrlsData } from "../controllers/authController.js"
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = Router();

router.post("/signup", schemaValidate(schemaSignup), creatUser);
router.post("/signin", schemaValidate(schemaSignin), SignIn);
router.get("/users/me", userMiddleware, getUserUrlsData)

export default router;