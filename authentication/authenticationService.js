require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('../user/userService');

const authenticationService = {
    async signIn(req, res) {
        var data = req.body;
        var email = data.email;

        const userInfo = await usersService.getUserByEmail(email);

        if (userInfo && userInfo.password && bcrypt.compareSync(data.password, userInfo.password)) {
            const userId = userInfo.userId;
            const userFeatures = await usersService.getUserFeatures(userId);
            if (userInfo) {
                let payload = {
                    userId: userInfo.userId,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    userTypeId: userInfo.userTypeId,
                    role: userInfo.role
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1hr" });
                res.json({
                    success: true,
                    token: token,
                    features: userFeatures,
                    role: userInfo.role,
                    email: userInfo.email,
                    message: "Login Successfully..!"
                });
            } else {
                res.json({
                    success: false,
                    message: 'User is deactivated..!'
                })
            }
        } else {
            res.json({
                success: false,
                message: 'Invalid username and password..!'
            })
        }
    }
}

module.exports = {
    authenticationService
}