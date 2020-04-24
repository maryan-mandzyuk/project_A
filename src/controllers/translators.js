const { Translator } = require('../models');
const asyncHandler = require('../middleware/async');
const ErrorRespose = require('../utils/errorResponse');

const createTranslator = asyncHandler(async (req, res, next) => {
    const newTranslator = await Translator.create(req.body);
    res.status(201).json({
        succes: true,
        data: newTranslator,
    });
});

const getTranslator = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const translator = await Translator.findById(id);

    if (!translator) {
        return next(new ErrorRespose(404, `Translator not found with id of ${id} `));
    }

    res.status(200).json({
        success: true,
        data: translator,
    });
});

const getTranslators = asyncHandler(async (req, res, next) => {
    const translators = await Translator.find();

    res.status(200).json({
        success: true,
        data: translators,
    });
});

module.exports = {
    createTranslator,
    getTranslator,
    getTranslators,
};
