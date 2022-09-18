const OrdersModel = require('../models/orders-model');
const CartModel = require('../models/cart-model');

async function getOccupied() {
    const now = new Date();
    const correct_timezone = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const orders = await OrdersModel.find({delivery_date: {$gte: correct_timezone}}).exec();
    const dates = orders.map(d => {return d.delivery_date});
    return dates;
};

async function addOrder(newOrder) {
    const order = await newOrder.save();
    if(newOrder.cartID.startsWith('guest', 0)) {
        return order;
    }else {
        await CartModel.findByIdAndUpdate({_id: newOrder.cartID}, {closed: true});
        return order;
    };
};



module.exports = {
    getOccupied,
    addOrder 
};