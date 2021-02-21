var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    var token = req.header('auth');

    if(!token) return res.status(401).sen('No access');

    try {
        var tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenVerified;

        next();

    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
