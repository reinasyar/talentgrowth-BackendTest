const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;

// create New User
exports.createuser = async (req, res, next) => {
    const {email, password, name} = req.body;
    try {
        // check if email exists
        const [check] = await db.query('SELECT email, name FROM users WHERE email = ?', [email]);
        if (check.length > 0){
            const error = new Error('Email already used');
            error.statusCode = 400;
            throw error;
        };
  
        const hashedPassword = await bcrypt.hash(password,10);
        const [result] = await db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, name]);
        res.json({ message: 'New user added successfully'});
    } catch (err) {
        next(err);
    };
};

// user login
exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        const [check] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = check[0];

        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        };

        const isUser = await bcrypt.compare(password, user.password);
        if (!isUser){
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        };

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '6h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        next(err);
    };
}

// user to profile
exports.profile = async (req, res, next) => {
    try {
        const [user] = await db.query('SELECT id, email, name, created_at FROM users WHERE id = ?', [req.user.id]);
        if (!user || user.length === 0) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        };
        res.json(user[0]);
    } catch (err){
        next(err);
    };
};