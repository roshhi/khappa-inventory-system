import express from 'express';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

export default app;