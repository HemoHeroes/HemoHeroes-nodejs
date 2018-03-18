"use strict";

const middleware = (request, response, next) => {
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Methods", ["GET", "POST", "PUT", "OPTIONS"]);
    request.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    return next();
};

module.exports = middleware;