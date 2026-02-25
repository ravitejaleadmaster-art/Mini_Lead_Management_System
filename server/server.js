require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 

const JWT_SECRET = process.env.JWT_SECRET || 'my_access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'my_refresh_secret'; // Use a different secret
const authenticateToken = require('./middleware/authMiddleware');

const ADMIN_USER = { username: 'admin', password: 'password' };

const app = express();
app.use(express.json());
app.use(cookieParser()); 


app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));



// --- TOKEN REFRESH LOGIC ---

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        // Generate Access Token (Short-lived: 15m)
        const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '15m' });

        // Generate Refresh Token (Long-lived: 7d)
        const refreshToken = jwt.sign({ user: username }, REFRESH_SECRET, { expiresIn: '7d' });

        // Store Refresh Token in HttpOnly Cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // true in production (HTTPS only)
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({ success: true, token }); 
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post('/api/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newToken = jwt.sign({ user: decoded.user }, JWT_SECRET, { expiresIn: '15m' });
        res.json({ success: true, token: newToken });
    });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ success: true, message: "Logged out" });
});


app.get('/', (req, res) => res.send('API is running...'));
app.use('/', require('./routes/health'));
app.use('/api/leads', authenticateToken, require('./routes/leads'));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
