const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({error: 'There is no token provided!'});

    const token = header.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({error: 'Invalid token!'});

        req.user = user;
        next();
    });
};