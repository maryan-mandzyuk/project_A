const express = require('express');
const connectDB = require('./src/db');
const errorHandler = require('./src/middleware/errorHandler');
const parser = require('./src/parser');
require('dotenv').config();

const books = require('./src/routes/books');
const sellers = require('./src/routes/sellers');

const app = express();
app.use(express.json());
connectDB();

app.use('api/v1/books', books);
app.use('api/v1/sellers', sellers);

parser();

app.use(errorHandler);
const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
