const CartItemModel = require('../models/cart-item-model');
const CartModel = require('../models/cart-model');

async function getCarts(id) {
    const carts = await CartModel.find({user: id}).lean().exec();
    for(let cart of carts) {
        cart.items = await CartItemModel.find({cartID: cart._id}).exec();
    };
    return carts;
};

async function addItem(newItem) {
   return await newItem.save();
};

async function addCart(newCart) {
   return await newCart.save();
};

async function updateItem(updatedItem) {
    const result = await CartItemModel.findByIdAndUpdate({_id: updatedItem._id}, updatedItem, { new: true }).exec();
    if(result.matchedCount === 0) return null;
    else return result;
};

async function deleteItems(direct, id) {
    try {
        let result;
        if(direct === 'cart') result = await CartItemModel.deleteMany({cartID: id}).exec();
        else if(direct === 'item') result = await CartItemModel.deleteOne({_id: id}).exec();  ;
        return result.deletedCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
    }    
}


module.exports = {
    getCarts,
    addItem,
    addCart,
    updateItem,
    deleteItems
};