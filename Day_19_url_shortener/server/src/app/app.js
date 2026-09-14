import express from 'express';
import cors from 'cors';
import urlRoute from '../routes/url.routes.js';
import { redirectToOriginalUrlController } from '../controller/url.controller.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/urls', urlRoute);

app.get('/:shortCode', redirectToOriginalUrlController)

export default app;