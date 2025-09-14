const { status } = require('express/lib/response');
const jwt = require('jsonwebtoken');
const { authenticationService } = require('./authenticationService');
require('dotenv').config();

const authJwt = {
    async verifyToken(req, res, next) {
        try {
            const bearerToken = req.get("Authorization");
            if (!bearerToken) {
                return res.status(401).json({
                    message: "Token Not Provided",
                    status: 401
                });
            }
            const token = bearerToken.split(' ')[1];

            if(authenticationService.isTokenBlacklisted(token)){
                return res.status(401).json({
                      message: "Token is blacklisted. Please login again.",
                    status: 401
                })
            }


            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Invalid token',
                status: 401
            });
        }
    }
}

module.exports = authJwt;
