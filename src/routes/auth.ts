import express from "express";
import {AuthController} from "../controllers/AuthController";
const router = express.Router();

router.post('/setSessionCookie', AuthController.setSessionCookie);
router.post('/getAuthToken', AuthController.getAuthToken);
router.post('/removeSessionCookie', AuthController.removeSessionCookie);

export default router;