require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Simple Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/', require('./routes/health'));

// API routes
app.use('/api/leads', require('./routes/leads'));


const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
