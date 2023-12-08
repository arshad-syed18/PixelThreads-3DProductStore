import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import sdRoutes from './routes/stablediffusion.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/sdapi', sdRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});