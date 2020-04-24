const axios = require('axios');
const cheerio = require('cheerio');

const nashFormat = 'https://nashformat.ua/search?keyword=%D0%BA%D0%BE%D0%B1%D0%B7%D0%B0%D1%80&sort=views';

const selectors = {
    listItems: '.product',
    listBookLink: '.product a',
    tablePropAttr: 'div.card__info',
    tablePropValue: 'div.card__info',
    infoTableRows: 'div.card__params div.row .card__info',
    title: 'h1.card__title',
    imageLink: 'div.card__preview img',
    auhor: 'Автор',
    publisher: 'Видавництво',
    publicationYear: 'Рік видання',
    isbn: 'ISBN',
    pageNumber: 'Кількість сторінок',
    translator: 'Перекладач',
    originalTitle: '',
    format: '',
    paperPrice: '.card_price-current-real',
    ebookPrice: '',
    paperLink: '',
    ebookLink: '',
    checkIfPaper: '',
    checkOtherFormat: false,
    paperFormat: '',
    ebookFormat: '',
    splitAttr: true,
    splitSymbol: ':',
};

const getLinksBySeacrh = async link => {
    const res = await axios.get(link);
    const $ = cheerio.load(res.data);
    const listItems = $(selectors.listItems);
    listItems.splice(5);
    const linksList = [];
    listItems.each((index, element) => {
        const item = cheerio.load(element);
        const bookLink = item(selectors.listBookLink).attr('href');
        linksList.push(bookLink);
    });
    return linksList;
};

const getTableProps = tableRows => {
    const tableProps = [];

    tableRows.each((index, element) => {
        const item = cheerio.load(element);
        const attr = item(selectors.tablePropAttr)
            .text()
            .trim();
        const value = item(selectors.tablePropValue)
            .text()
            .trim();
        if (selectors.splitAttr) {
            const props = attr.split(selectors.splitSymbol);
            return tableProps.push({ attr: props[0].trim(), value: props[1].trim() });
        }
        tableProps.push({ attr, value });
    });

    return tableProps;
};

const getIsbn = async link => {
    const res = await axios.get(link);
    const $ = cheerio.load(res.data);

    const tableRows = $(selectors.infoTableRows);
    const tableProps = getTableProps(tableRows);

    const isbn = tableProps.find(el => el.attr === 'ISBN');
    return isbn.value;
};

const getBookInfo = async link => {
    const bookInfo = {};
    const res = await axios.get(link);
    const $ = cheerio.load(res.data);

    bookInfo.title = $(selectors.title)
        .text()
        .replace(/.*?«(.*)».*/, '$1');
    bookInfo.image = $(selectors.imageLink).attr('src');

    const tableRows = $(selectors.infoTableRows);
    const tableProps = getTableProps(tableRows);

    let isbn;
    bookInfo.format = '';
    tableProps.forEach(el => {
        switch (el.attr) {
            case selectors.auhor:
                bookInfo.author = el.value;
                break;
            case selectors.publisher:
                bookInfo.publisher = el.value;
                break;
            case selectors.publicationYear:
                bookInfo.publicationYear = el.value;
                break;
            case selectors.translator:
                bookInfo.translator = el.value;
                break;
            case selectors.isbn:
                isbn = el.value;
                break;
            case selectors.pageNumber:
                bookInfo.pageNumber = parseInt(el.value.replace(/\D/g, ''));
                break;
            case selectors.originalTitle:
                bookInfo.originalTitle = el.value;
                break;
            case selectors.format:
                bookInfo.format = el.value;
                break;
            default:
                break;
        }
    });
    const paperPrice = $(selectors.paperPrice)
        .text()
        .replace(/\D/g, '');

    const ebookPrice = $(selectors.ebookPrice)
        .text()
        .replace(/\D/g, '');

    bookInfo.paper = {
        price: parseInt(paperPrice),
    };
    bookInfo.ebook = {
        price: parseInt(ebookPrice),
    };

    // check if book is paper
    if (selectors.checkOtherFormat) {
        const typeButton = $(selectors.checkIfPaper).get().length;
        if (typeButton > 0) {
            bookInfo.isEbook = false;
            bookInfo.paper.isbn = isbn;
            bookInfo.paper.link = link;

            const ebookLink = $(selectors.ebookLink).attr('href');
            if (ebookLink) {
                bookInfo.ebook.isbn = await getIsbn(ebookLink);
                bookInfo.ebook.link = ebookLink;
            }
        } else {
            bookInfo.isEbook = true;
            bookInfo.ebook.isbn = isbn;
            bookInfo.ebook.link = link;

            const paperLink = $(selectors.paperLink).attr('href');
            if (paperLink) {
                bookInfo.paper.isbn = await getIsbn(paperLink);
                bookInfo.paper.link = paperLink;
            }
        }
    } else {
        const props = {
            isbn,
            link,
            price: parseInt(paperPrice),
        };

        if (bookInfo.format === selectors.paperFormat) {
            bookInfo.paper = props;
            bookInfo.isEbook = false;
        } else if (bookInfo.format === selectors.ebookFormat) {
            bookInfo.ebook = props;
            bookInfo.isEbook = true;
            bookInfo.paper.price = NaN;
        }
    }

    // ---------------------------------------

    return bookInfo;
};

const parser = async () => {
    const testLink =
        'https://nashformat.ua/products/ebook-ploschi-ta-vezhi.-sotsialni-zv-yazky-vid-masoniv-do-fejsbuku-620157';
    // const links = await getLinksBySeacrh(nashFormat);
    const bookInfo = await getBookInfo(
        'https://book-ye.com.ua/catalog/dytyacha-proza/roki-mij-druh-iz-sertsem-ta-hvyntykamy/'
    );

    console.log(bookInfo);
};

module.exports = parser;
