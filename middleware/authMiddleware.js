const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header){
        const error = new Error('Access denied. No Token provided.');
        error.statusCode = 401;
        return next(error);
    };

    const token = header.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err){
            const error = new Error('Invalid token.');
            error.statusCode = 403;
            return next(error);
        };

        req.user = user;
        next();
    });
};