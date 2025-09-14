require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('../user/userService');

let tokenBlacklist=[];

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
    },

    async logout(req,res){
        try{
            const bearerToken = req.get("Authorization");
              if (!bearerToken) {
                return res.status(401).json({ success: false, message: "Token not provided" });
            }

            const token = bearerToken.split(" ")[1];
            tokenBlacklist.push(token); 

            return res.status(200).json({ success: true, message: "Logout successfully...!" });
        }catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
      isTokenBlacklisted(token) {
        return tokenBlacklist.includes(token);
    }
}

module.exports = {
    authenticationService
}