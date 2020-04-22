const Seller = require('../models/Seller');
const asyncHandler = require('../middleware/async');
const ErrorRespose = require('../utils/errorResponse');

const createSeller = asyncHandler(async (req, res, next) => {
    const newSeller = await Seller.create(req.body);
    res.status(201).json({
        success: true,
        data: newSeller,
    });
});

const getSellers = asyncHandler(async (req, res, next) => {
    const sellers = await Seller.find();
    res.status(200).json({
        success: true,
        data: sellers,
    });
});

const getSeller = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const seller = await Seller.findById(id);

    if (!seller) {
        next(new ErrorRespose(`Seller not found with id of ${id}`));
    }
    res.status(200).json({
        success: true,
        data: seller,
    });
});

module.exports = {
    createSeller,
    getSeller,
    getSellers,
};
