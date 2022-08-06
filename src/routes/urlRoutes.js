import { Router } from "express";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import schemaUrl from "../schemas/urlSchema.js"
import { postUrl, getUrlById, getShortUrlByName, deleteUrl } from "../controllers/urlController.js"

const router = Router();

router.post("/urls/shorten", 
schemaValidate(schemaUrl),
userMiddleware, postUrl
)
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", getShortUrlByName)
router.delete("/urls/:id", userMiddleware, deleteUrl)

export default router;