import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import sdRoutes from './routes/stablediffusion.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/sdapi', sdRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log('Server listening on port 8080');
});