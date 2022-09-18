const express = require('express');
const UserModel = require('../models/user-model');
const auth_dal = require('../data-access-layer/auth-dal');
const verifyLoggedIn = require("../middleware/verify-logged-in");
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        
        //1
        const user = new UserModel(request.body);
        //2 validation
        const errorMessages = user.validateSync(); // Exepcted validation errors
        
        // 3. Send status 400 if validations fail including the messages created by JOI
        if (errorMessages) {
            response.status(400).send(errorMessages);
            return;
        };

        const checkUser = await auth_dal.checkUser(user)
        if(checkUser) return response.status(400).send('Username Or ID Number Already Exists'); 
           
        //3. Call DAL and send UserModel
        const registeredUser = await auth_dal.register(user);

        //8. return UserModel to client
        response.json(registeredUser);
    } catch (error) {
        response.status(500).send(error.message);
    }
   
})

router.post('/login', async (request, response) => {
    try {
        //1. Create 'UserModel' that contains username, firstname, lastname
        const user = new UserModel(request.body);
        
        //3. Call DAL and send UserModel
        const loggedInUser = await auth_dal.login(user);
        if(!loggedInUser) {  
            return response.status(401).send('Credentials incorrect!');
        };
        //8. return UserModel to client
        response.json(loggedInUser);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

router.post('/verify', verifyLoggedIn, async (request, response) => {
    try {
        const authorization = "approved";
        response.json(authorization);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;