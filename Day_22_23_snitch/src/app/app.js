import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from '../routes/auth.route.js';
import productRoute from '../routes/product.route.js';
import cartRoute from '../routes/cart.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);

export default app;