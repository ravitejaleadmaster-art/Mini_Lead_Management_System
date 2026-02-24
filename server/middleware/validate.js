const allowedSources = ['manual', 'ad', 'referral'];
const allowedStatuses = ['new', 'contacted', 'closed'];

exports.validateCreateLead = (req, res, next) => {
  const { name, phone, source } = req.body;
  const errors = [];
  if (!name || typeof name !== 'string' || !name.trim()) errors.push('Name is required');
  if (!phone || typeof phone !== 'string' || !/^\+?[0-9\- ]{7,20}$/.test(phone)) errors.push('Valid phone is required');
  if (!source || !allowedSources.includes(source)) errors.push('Source must be one of: ' + allowedSources.join(', '));
  if (errors.length) return res.status(400).json({ success: false, errors });
  next();
};

exports.validateUpdateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status || typeof status !== 'string' || !allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Status must be one of: ' + allowedStatuses.join(', ') });
  }
  next();
};
