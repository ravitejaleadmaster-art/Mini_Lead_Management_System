module.exports = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ success: false, errors });
  }
  
  // CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid identifier' });
  }
  res.status(err.status || 500).json({ success: false, error: err.message || 'Server error' });
};
