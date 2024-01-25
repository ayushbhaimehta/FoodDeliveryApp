const jwt = require("jsonwebtoken");
const secretKey = "112233";
const { UserModel } = require('../models/userSchema/user.schemaModel');

module.exports = async (req, res, next) => {
    const authorization = req.get("auth");
    if (!authorization) {
        return res.status(403).send({
            message: 'Token validation error'
        })
    }

    // const token = authorization.split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(authorization, secretKey);
    } catch (err) {
        return res.status(403).send({
            message: 'Error in token validation'
        })
    }
    if (!decodedToken) {
        return res.status(403).send({
            message: 'Validaion error in token verification '
        })
    }
    if (req.method === 'GET') {
        if (req.params.phoneNo) {
            const phoneNo = req.params.phoneNo;
            if (phoneNo !== decodedToken.phoneNo)
                return res.status(403).send({
                    message: 'JWt not matching with given details '
                })
        }
    }
    req.phoneNo = decodedToken.phoneNo;
    next();
};
