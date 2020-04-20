const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const connectDB = require('./src/db');
require('dotenv').config();

const app = express();
connectDB();
app.get('/', async () => {
    const res = await axios.get('https://nashformat.ua/catalog/novynky');
    const $ = cheerio.load(res.data);
    const html = $('.product-list_title h5 a');
    html.each((index, element) => {
        const title = cheerio.load(element);
        console.log(title.text());
    });
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
