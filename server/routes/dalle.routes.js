import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

// no credits remaining, change to different model
const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const image = await openai.images.generate({ prompt: prompt })// wont work no credits

        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    console.log(response);
})

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello World Route!' });
});

export default router;