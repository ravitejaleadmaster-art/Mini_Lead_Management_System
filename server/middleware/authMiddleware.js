jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'my_access_secret';


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or Expired Token' });
        }
        req.user = user;
        next(); 
    });
};

module.exports = authenticateToken;