const axios = require('axios');
const cheerio = require('cheerio');

const nashFormat = 'https://nashformat.ua/search?keyword=%D0%BA%D0%BE%D0%B1%D0%B7%D0%B0%D1%80&sort=views';

const getLinksBySeacrh = async link => {
    const res = await axios.get(link);
    const $ = cheerio.load(res.data);
    const listItems = $('.row.list.item');
    listItems.splice(5);
    const linksList = [];
    listItems.each((index, element) => {
        const item = cheerio.load(element);
        const bookLink = item('.product-list_title h5 a').attr('href');
        const bookTitle = item('.product-list_title h5 a').text();
        linksList.push({ bookLink, bookTitle });
    });
    return linksList;
};

const getBookInfo = async link => {
    const bookInfo = {};
    const res = await axios.get(
        'https://nashformat.ua/products/ebook-ploschi-ta-vezhi.-sotsialni-zv-yazky-vid-masoniv-do-fejsbuku-620157'
    );
    const $ = cheerio.load(res.data);

    // if ebook
    const typeButton = $('#tabsPaper[class~="active"]').get().length;
    if (typeButton > 0) {
        const paperPrice = $('#tabsPaper .tab-price')
            .text()
            .replace(/\D/g, '');

        bookInfo.paperPrice = parseInt(paperPrice);
        bookInfo.ebook = false;
    } else {
        const ebookPrice = $('#tabsElectronic .tab-price')
            .text()
            .replace(/\D/g, '');
        bookInfo.ebookPrice = parseInt(ebookPrice);

        bookInfo.ebook = true;
    }

    // ---------------------

    const table = $('#features tbody tr');
    const tableProps = [];

    table.each((index, element) => {
        const item = cheerio.load(element);
        const attr = item('.attr')
            .text()
            .trim();
        const value = item('.value')
            .text()
            .trim();
        tableProps.push({ attr, value });
    });
    tableProps.forEach(el => {
        switch (el.attr) {
            case 'Автор':
                bookInfo.author = el.value;
                break;
            case 'Видавництво':
                bookInfo.publisher = el.value;
                break;
            case 'Рік видання':
                bookInfo.publicationYear = el.value;
                break;
            case 'Перекладачі':
                bookInfo.translator = el.value;
                break;
            case 'ISBN':
                bookInfo.isbn = el.value;
                break;
            case 'Кількість сторінок':
                bookInfo.pageNumber = parseInt(el.value.replace(/\D/g, ''));
                break;
            case 'Оригінальна назва':
                bookInfo.originalTitle = el.value;
                break;
            default:
                break;
        }
    });

    bookInfo.title = link.bookTitle;

    return bookInfo;
};

const parser = async () => {
    const links = await getLinksBySeacrh(nashFormat);
    const bookInfo = await getBookInfo(links[0]);
    console.log(bookInfo);
};

module.exports = parser;
