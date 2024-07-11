const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ username, email, password });
        await user.save();

        const payload = { user:username };

        jwt.sign(payload, 'jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            return res.json({ token, username, email});
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: user.username };

        jwt.sign(payload, 'jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            return res.json({ token, user:user.username, email:user.email});
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};


module.exports = { register, login };
