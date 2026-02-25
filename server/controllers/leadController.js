const Lead = require('../models/Lead');

// Create a new lead
exports.createLead = async (req, res, next) => {
  try {
    const { name, phone, source } = req.body;
    const lead = new Lead({ name, phone, source });
    const saved = await lead.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
};

// List leads (simple pagination optional query)
exports.listLeads = async (req, res, next) => {
  try {
    let { page = 1, limit = 50 } = req.query;
    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.max(parseInt(limit, 10) || 50, 1);
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(),
    ]);

    const totalPages = Math.max(Math.ceil(total / limit), 1);
    res.json({ success: true, data: leads, meta: { total, totalPages, page, limit } });
  } catch (err) {
    next(err);
  }
};

// Update lead status
exports.updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const lead = await Lead.findById(id);
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
    lead.status = status;
    await lead.save();
    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};
