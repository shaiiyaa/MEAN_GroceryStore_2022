const mongoose = require('mongoose');

const ProductScheme = mongoose.Schema({
    name: {
        type: String,   
        required: [true, 'Name is required.'],
        minlength: [1, 'Name must be at least 1 characters long.'],
        maxlength: [25, "Name cannot exceed 25 characters."]
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Category is required.'],
        minlength: [1, 'Category must be at least 1 characters long.'],
        maxlength: [100, "Category brand cannot exceed 100 characters."]
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Price is required.'],
        min: [0, 'Price most be positive number.'],
        max: [10000, 'Price cannot exceed 10000.']
    },    
    imageName: String,
    
}, { versionKey: false, toJSON: {virtuals: true}});


// 3.Create Mongoose Model with scheme defined above
const ProductModel = mongoose.model("ProductModel", ProductScheme, "products");

// 4.Return Mongoose Model (module.exports)
module.exports = ProductModel;
