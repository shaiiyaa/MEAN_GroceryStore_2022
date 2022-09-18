const ProductModel = require('../models/product-model');
const OrdersModel = require('../models/orders-model');
const mongoose = require('mongoose');
require('./mongodb-access');

async function getInfo() {
    const info = {};
    info.orders = await OrdersModel.count().exec(); 
    info.products = await ProductModel.count().exec(); 
    return info;
};

module.exports = {
    getInfo
}