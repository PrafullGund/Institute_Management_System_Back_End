const { status } = require('express/lib/response');
const jwt = require('jsonwebtoken');
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

MediaSourceHandle.exports = authJwt;