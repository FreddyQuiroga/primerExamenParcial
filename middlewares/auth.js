// middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token inválido' });
    }
}

module.exports = auth;
