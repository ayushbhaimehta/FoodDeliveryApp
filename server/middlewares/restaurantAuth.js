const jwt = require("jsonwebtoken");
const secretKey = "112233";

module.exports = (req, res, next) => {
    const authorization = req.get("auth");
    if (!authorization) {
        return res.status(403).send({
            message: 'Token validation error'
        })
    }
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
        const phoneNo = req.params.phoneNo;
        if (phoneNo !== decodedToken.phoneNo)
            return res.status(403).send({
                message: 'JWt not matching with given details '
            })
    }

    req.phoneNo = decodedToken.phoneNo;
    next();
};
