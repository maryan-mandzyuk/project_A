const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => `App listening on port ${port}`);

app.get('/', async () => {
    const res = await axios.get('https://nashformat.ua/catalog/novynky');
    const $ = cheerio.load(res.data);
    const html = $('.product-list_title h5 a');
    html.each((index, element) => {
        const title = cheerio.load(element);
        console.log(title.text());
    });
});
