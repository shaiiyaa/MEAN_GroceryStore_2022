const express = require('express');
const OrderModel = require('../models/orders-model');
const orders_dal = require('../data-access-layer/orders-dal');
const router = express.Router();

router.get('/occupied', async (request, response) => {
    try {
        const occupied = await orders_dal.getOccupied();
        response.json(occupied);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

//New Order
router.post('', async (request, response) => {
    try {
        const newOrderModel = new OrderModel(request.body);
        const errorMessages = newOrderModel.validateSync();// Expected validation errors
        //3. Sens status 400 if validations fail
        if(errorMessages) {
            response.status(400).send(errorMessages);
            return;
        };
        
        const neworder = await orders_dal.addOrder(newOrderModel);
        response.json(neworder);
    } catch (error) {
        response.status(500).send(error.message);
    }
});


module.exports = router;