const mongoose = require("mongoose");

// 1. Define schema (ProductModel properties + DB field definitions / structure)
// 2. Add validations to the schema
const CartSchema = mongoose.Schema({
    user: {
        type: String,
        required: [true, "Cart ID required"],
    },
    creation: {
        type: Date,
        required: true,
    },
    closed: {
        type: Boolean,
        required: true
    }
}, { versionKey: false, toJSON: {virtuals: true} });

// 3. Create Mongoose Model with scheme defined above
const CartModel = mongoose.model("CartModel", CartSchema, "shopping_carts");

// 4. Return Mongoose Model (module.exports)
module.exports = CartModel;