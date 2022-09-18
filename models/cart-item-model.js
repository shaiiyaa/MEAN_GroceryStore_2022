const mongoose = require("mongoose");

// 1. Define schema (ProductModel properties + DB field definitions / structure)
// 2. Add validations to the schema
const CartItemSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Item ID required"],
    },
    name: {
        type: String,
        required: [true, "Item name is required."]
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required.'],
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
}, { versionKey: false, toJSON: {virtuals: true} });


// 3. Create Mongoose Model with scheme defined above
const CartItemModel = mongoose.model("CartItemModel", CartItemSchema, "cart_items");

// 4. Return Mongoose Model (module.exports)
module.exports = CartItemModel;