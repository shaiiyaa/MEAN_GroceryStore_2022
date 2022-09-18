const mongoose = require("mongoose");

// 1. Define schema (ProductModel properties + DB field definitions / structure)
// 2. Add validations to the schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Min 2 Characters"],
        minlength: [2],
        maxlength: [50]
    },
    lastName: {
        type: String,
        required: [true, "Min 2 Characters"],
        minlength: [2],
        maxlength: [50]
    },
    username: {
        type: String,
        required: [true, "Email required"],
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    idNumber: {
        type: Number,
        required: [true, "ID Must Be Numbers!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must be between 1-8 characters"],
        min: [1],
        max: [8]
    },
    uuid: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    },
    city: String,
    street: String
}, { versionKey: false, toJSON: {virtuals: true}, id: false});

// 3. Create Mongoose Model with scheme defined above
const UserModel = mongoose.model("UserModel", UserSchema, "users");

// 4. Return Mongoose Model (module.exports)
module.exports = UserModel;