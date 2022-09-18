const mongoose = require("mongoose");

// 1. Define schema (ProductModel properties + DB field definitions / structure)
// 2. Add validations to the schema
const OrdersSchema = mongoose.Schema({
    userID: {
        type: String,
        required: [true, "User ID required"],
    },
    cartID: {
        type: String,
        required: [true, "Cart ID required"],
    },
    total_price: {
        type: Number,
        required: [true, "Total Price required"],
    },
    city: {
        type: String,
        required: [true, "City required"],
    },
    street: {
        type: String,
        required: [true, "Street required"],
    },
    delivery_date: {
        type: Date,
        required: [true, "Delivery Date required"],
    },
    order_date: {
        type: Date,
        required: [true, "Order Date required"],
    },
    card_4Digits: {
        type: String,
        required: [true, "Card Last 4 Digits required"],
    }
}, { versionKey: false, toJSON: {virtuals: true} });

// 3. Create Mongoose Model with scheme defined above
const OrdersModel = mongoose.model("OrdersModel", OrdersSchema, "orders");

// 4. Return Mongoose Model (module.exports)
module.exports = OrdersModel;