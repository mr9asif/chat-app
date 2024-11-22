import express from "express";
import { getMsg, sendMsg } from "../controller/massege.js";

const router = express.Router();

router.post('/send/:id', sendMsg)
router.get('/:id', getMsg)

export default router;

