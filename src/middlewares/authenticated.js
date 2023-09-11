const jwt = require('jsonwebtoken');
const config = require('../../config');  // Get the config file

let auth = (req, res, next) => {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Authentication failed. No token provided.' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => { // Use the secret from the config
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).send({ message: 'Authentication failed. Token has expired.' });
            } else {
                return res.status(401).send({ message: 'Authentication failed. Invalid token.' });
            }
        }

        if (decoded.user && decoded.user.status === true) {
            req.user = decoded.user;
            next();
        } else {
            return res.status(403).send({ message: 'Access denied. Your account is not enabled.' });
        }
    });
}

module.exports = { auth };
