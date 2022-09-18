function verifyAdmin(request, response, next) {

    const isAdmin = JSON.parse(request.headers.admin_auth.toLowerCase());
    if(!isAdmin) {
        response.status(401).send('You are not authorized to access this resource! <br/> Only admin is alowed.');
        return;
    };
    
    next();
};

module.exports = verifyAdmin