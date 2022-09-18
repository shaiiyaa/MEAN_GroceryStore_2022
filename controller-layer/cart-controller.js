const express = require('express');
const CartModel = require('../models/cart-model');
const cart_dal = require('../data-access-layer/cart-dal');
const CartItemModel = require('../models/cart-item-model');
const { request, response } = require('express');

const router = express.Router();
router.get('/:id', async (request, response) => {
    try {
        const userID = request.params.id;
        
        const carts = await cart_dal.getCarts(userID);
        response.json(carts);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

//New Cart
router.post('/newCart', async (request, response) => {
    try {
        const newCartModel = new CartModel(request.body);
        const errorMessages = newCartModel.validateSync();// Expected validation errors
        //3. Sens status 400 if validations fail
        if(errorMessages) {
            response.status(400).send(errorMessages);
            return;
        };

        const newCart = await cart_dal.addCart(newCartModel);
        response.json(newCart);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.post('/newItem', async (request, response) => {
    try {
        const newItemModel = new CartItemModel(request.body);
        const errorMessages = newItemModel.validateSync();// Expected validation errors
        //3. Sens status 400 if validations fail
        if(errorMessages) {
            response.status(400).send(errorMessages);
            return;
        };
        const newItem = await cart_dal.addItem(newItemModel);
        response.json(newItem);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.put('', async (request, response) => {
    try {
        request.body.price = request.body.price.$numberDecimal;
        const updatedItemModel = new CartItemModel(request.body);
        
        const errorMessages = updatedItemModel.validateSync();// Expected validation errors
        //3. Sens status 400 if validations fail
        if(errorMessages) {
            response.status(400).send(errorMessages);
            return;
        };
        const updatedItem = await cart_dal.updateItem(updatedItemModel);
        response.json(updatedItem);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.delete('/:id', async (request,response) => {
    try {
        const cartItemID = request.params.id;
        const deleted = await cart_dal.deleteItems('item', cartItemID);
        
        if(!deleted) {response.status(404).send(`ID ${cartItemID} doesn't exsist`); return;};
        
        response.status(204).json(deleted);
    } catch (err) {
        response.status(500).send(error.message);
    }
});

router.delete('/cart/:id', async (request,response) => {
    try {
        const cartID = request.params.id;
        const deleted = await cart_dal.deleteItems('cart', cartID);
        
        if(!deleted) {response.status(404).send(`ID ${cartID} doesn't exsist`); return;};
        response.status(204).json(deleted);
    } catch (err) {
        response.status(500).send(error.message);
    }
});

module.exports = router;