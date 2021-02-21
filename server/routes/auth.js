const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const token = req.header('auth');

    if(!token) return res.status(401).sen('No access');

    try {
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenVerified;

        next();

    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
