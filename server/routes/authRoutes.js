import { Router } from "express";
import { changeEmail, changeName, getAllSavedStuff, logIn, saveTvOrMovie, signUp } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { rateLimit } from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message:"You only limited to 100 request per 15 minutes",
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

const router = Router()

router.post("/signup",signUp)
router.post("/login",logIn)

router.post("/save",authMiddleware,apiLimiter,saveTvOrMovie)
router.get("/getAllStuff",authMiddleware,getAllSavedStuff)
router.post("/changeName",authMiddleware,apiLimiter,changeName)
router.post("/changeEmail",authMiddleware,apiLimiter,changeEmail)

export default router