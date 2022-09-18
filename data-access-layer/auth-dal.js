const jwt = require('jsonwebtoken');
const crypto = require('../helpers/crypto-helper')
const uuid = require('uuid');
const UserModel = require('../models/user-model');

async function login(user) {  
    //X. Encrpt password using HASHING
    user.password = crypto.hash(user.password);
    //4. Check username+password exist in db table
    const loggedInUser = await UserModel.findOne({username: user.username, password: user.password}).lean().exec();
    if (!loggedInUser) {
        return null;
    };
    loggedInUser.token = jwt.sign({ loggedInUser }, config.jwtKey, { expiresIn: '30m' });//30 == 30s|30m== minutes
    //6. Remove passwort and id from UserModel
    delete loggedInUser.password;
    delete loggedInUser._id
    
    //7. Return UserModel to controller
    return loggedInUser;
};

async function register(user) {
    //X. Encrpt password using HASHING
    user.password = crypto.hash(user.password);
    //X. Create UUID
    user.uuid = uuid.v4();
    //4. Check username+password exist in db table
    await user.save();
    //6. Remove passwort from UserModel
    delete user._doc.password;
    delete user._doc._id;
    //5. Create Token and add to 'UserModel'
    user._doc.token = jwt.sign({ user }, config.jwtKey, { expiresIn: '30m' });
    //7. Return UserModel to controller
    return user;
};


async function checkUser(user) {
    const usernameError = await UserModel.findOne({username: user.username}).exec();
    if(usernameError) return usernameError;
    return await UserModel.findOne({idNumber: user.idNumber}).exec();
};


module.exports = {
    login,
    register,
    checkUser
};