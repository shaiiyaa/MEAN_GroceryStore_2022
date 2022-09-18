const express = require("express");
const product_dal = require("../data-access-layer/product-dal");
const ProductModel = require('../models/product-model');
const verifyLoggedIn = require('../middleware/verify-logged-in');
const verifyAdmin = require('../middleware/verify-admin');
const router = express.Router();

//////////////////////////////////////////////////////////////
//Get One
router.get('/item/:id', async (request, response) => {
    try {
        const _id = request.params.id;
        const product = await product_dal.getOneProduct(_id);
        response.json(product);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

//Get Searched Products
router.get('/search/:keys', async (request, response) => {
    try {
        const search_keys = request.params.keys;
        const results = await product_dal.getSearchedProducts(search_keys);

        results.length ? response.json(results) : response.status(400).send("Sorry Didn't Find Any Product.");
    } catch (error) {
        response.status(500).send(error.message);
    }
});

///Get Category Products
router.get('/:id',  async (request, response) => {
    try {
        const _id = request.params.id;
        
        const product = await product_dal.getCategoryProducts(_id);
        response.json(product);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

//Post
router.post('', [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        //1. Create 'ProductModel' object from request.body
        const productModel = new ProductModel(request.body);
        //2. Run validations
        const errorMessages = productModel.validateSync();// Expected validation errors
        //3. Sens status 400 if validations fail
        if(errorMessages) {
            response.status(400).send(errorMessages);
            return;
        }
        // //Handle files
        const image = request.files && request.files.image ? request.files.image : null;
        if(!image) return response.status(400).send('Missing Image.');

        // 4. continue if validation succeeds
        const newProduct = await product_dal.addProduct(productModel, image);
        
        response.status(201).json(newProduct);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

//PATCH
router.patch('/item/:id', [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        // 1. Capture productID and product details from URL and FORM
        const productId = request.params.id;
        // 2. Find element in database => Find index of element with ID in the 'database' array
        const product = await product_dal.getOneProduct(productId);
        // 3. Replace product details with 'newProduct' at the 'index' found in no. 2
        for (let key in request.body)
        product[key] = request.body[key];

        const errorMessages = product.validateSync(); // Exepcted validation errors
        if (errorMessages) return response.status(400).send(errorMessages);

        const image = request.files && request.files.image ? request.files.image : null;

        const result = await product_dal.updateProduct(productId, request.body, image);
        if(!result) {
            response.status(404).send(`ID ${_id} doesn't exsist`);
            return;
        }
        // 4. Return the updated product created
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
});
    
//////////////////////////////////////////////////////////////


// GET http://localhost:3001/api/products/images/7.jpg
router.get("/images/:name", (request, response) => {
    try {
        const fileName = request.params.name;
        const filePath = product_dal.getProductImage(fileName);
        response.sendFile(filePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;