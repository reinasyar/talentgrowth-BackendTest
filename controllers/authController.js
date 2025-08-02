const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET;

// create New User
exports.createuser = async (req, res) => {
    const {email, password, name} = req.body;
  
    try {
      // check if email exists
      const [check] = await db.query('SELECT email, name FROM users WHERE email = ?', [email]);
      if (check.length > 0) return res.status(400).json({ error: 'Email already exists, try other email!' });
  
      const hashedPassword = await bcrypt.hash(password,10);
      const [result] = await db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, name]);
      res.status(201).json({ message: 'New user added successfully'});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// user login
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const [check] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = check[0];

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isUser = await bcrypt.compare(password, user.password);
        if (!isUser) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '6h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

// user to profile
exports.profile = async (req, res) => {
    try {
        const [user] = await db.query('SELECT id, email, name, created_at FROM users WHERE id = ?', [req.user.id]);
        res.json(user[0]);
    } catch (err){
        res.status(500).json({error: err.message});
    }
};