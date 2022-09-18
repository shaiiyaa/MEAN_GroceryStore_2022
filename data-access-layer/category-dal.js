
const mongoose = require('mongoose');
require('./mongodb-access');

const CategoryModel = require('../models/category-model');


async function getAllCategories() {
    // return await CategoryModel.find().populate("products").exec();
    return await CategoryModel.find().exec();
}

module.exports = getAllCategories