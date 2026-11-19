
import { Router } from "express";
import { Login, Logout, Register } from "../controllers/server.controller.auth.ts";
import { VerifySession } from "../middleware/server.middleware.verifySession.ts";
import { CheckUserSession } from "../controllers/server.controller.auth.ts";

const router = Router();

router.post("/login", Login);
router.post("/registration", Register);
router.get('/me', VerifySession, CheckUserSession)
router.post('/logout', Logout)
export default router;
         