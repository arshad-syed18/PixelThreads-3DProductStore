import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

const apiKey = process.env.WIZMODEL_API_KEY; // Replace YOUR_API_KEY with your actual API key
// free Stable diffusion api, get your api key from https://www.wizmodel.com/docs/sdApi
const apiUrl = "https://api.wizmodel.com/sdapi/v1/txt2img";

router.route('/').post(async (req, res) => {
    console.log("Image Requested!")
    try {
        const { prompt } = req.body;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                prompt: prompt,
                steps: 100
            })
        });

        const result = await response.json();

        if (result) {
            console.log("Image Reieved!")
        } else {
            console.log("Image Not Recieved!");
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(200).json({ photo: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello World Route!' });
});

export default router;
