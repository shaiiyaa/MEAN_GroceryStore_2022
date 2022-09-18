const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
require('./mongodb-access');

const ProductModel = require('../models/product-model')

//////////////////////////////////////////////////////////
//Get one product
async function getOneProduct(id) {
    return await ProductModel.findById(id).exec();
};

//Get Searched Products
async function getSearchedProducts(keys) {
    return await ProductModel.find({ name: { $regex: keys, $options: 'i' }}).exec();
};

//Get Category Products
async function getCategoryProducts(id) {
    return await ProductModel.find({ categoryID: mongoose.Types.ObjectId(id) }).exec();  
};

//Add new product
async function addProduct(product, image) {
    // Save the image to disk:
    if (image) {
        const fileName = product._id + '.png';
        product.imageName = fileName;
        
        //save to dedicated folder 'c:/...../data-access-layer/../images/products/99.JPG'
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath);
    };

    const newProduct = await product.save();
    // product = await ProductModel.findById(product._id).populate("category").exec();

    return newProduct;
};

async function updateProduct(productId, changes, image){
    // Add 'image' handling functionality

    if (image) {
        const fileName = productId + '.png';
        changes.imageName = fileName;

        // Save file to a dedicated folder 'C:/...../data-access-layer/../images/products/99.JPG'
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        image.mv(absolutePath); // Save the file to the path
    }

    // const updatedProduct = await ProductModel.updateOne({_id: productId}, {$set: changes}).exec();
    const updatedProduct = await ProductModel
    .findByIdAndUpdate({_id: productId}, {$set: changes}, { new: true }).exec();

    return updatedProduct;
};

//////////////////////////////////////////////////////////

function getProductImage(imageName) {
    let absolutePath = path.join(__dirname, "..", "images", "products", imageName);
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
    };
    return absolutePath
}

module.exports = {
    getOneProduct,
    getSearchedProducts,
    getCategoryProducts,
    addProduct,
    updateProduct,
    getProductImage
}