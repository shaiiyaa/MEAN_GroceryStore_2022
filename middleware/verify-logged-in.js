const jwt = require('jsonwebtoken')

function verifyLoggedIn(request, response, next) {
    //1. Check if header containing the token exists (Header = "Authorization")
    if(!request.headers.authorization) { 
        response.status(401).send('Please Login.') ;
    };
    
    const token = request.headers.authorization.split(' ')[1];
    if(!token) {
        response.status(401).send('You are not authorized to access this resource.');
    }

    //3. Check if Token is valid (using JWT). if all is well, 'next()'
    jwt.verify(token, config.jwtKey, (err, payload) => {
        //A. if 'err' exists:[1] Token expired, [2] All else
        if(err && err.message === 'jwt expired') {
            response.status(403).send('Your Session has expired. Please Login Again');
        };

        if(err) {
            response.status(401).send('You are not authorized to access this resource.');
        }
        // B. if all is well, next()
        next();
    });
};

module.exports = verifyLoggedIn