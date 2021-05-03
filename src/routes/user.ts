/*
 * GET users listing.
 */
import express = require('express');
import {UserController} from "../controllers/UserController";
const router = express.Router();

router.post('/', UserController.createNewUser);
router.get('/:userId', UserController.getUserById);

export default router;