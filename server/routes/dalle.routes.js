import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// no credits remaining, change to different model
const openai = new OpenAI(process.env.OPENAI_API_KEY);



router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello World Route!' });
});

export default router;