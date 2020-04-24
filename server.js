const express = require('express');
const connectDB = require('./src/db');
const errorHandler = require('./src/middleware/errorHandler');
const parser = require('./src/parser');
require('dotenv').config();

const books = require('./src/routes/books');
const sellers = require('./src/routes/sellers');
const authors = require('./src/routes/authors');
const publishers = require('./src/routes/publishers');
const translators = require('./src/routes/translators');

const app = express();
app.use(express.json());
connectDB();

app.use('/api/v1/books', books);
app.use('/api/v1/sellers', sellers);
app.use('/api/v1/authors', authors);
app.use('/api/v1/publishers', publishers);
app.use('/api/v1/translators', translators);

parser();

app.use(errorHandler);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
