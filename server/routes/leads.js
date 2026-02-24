const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { validateCreateLead, validateUpdateStatus } = require('../middleware/validate');

// POST /api/leads - create lead
router.post('/', validateCreateLead, leadController.createLead);

// GET /api/leads - list leads
router.get('/', leadController.listLeads);

// PATCH /api/leads/:id/status - update status
router.patch('/:id/status', validateUpdateStatus, leadController.updateLeadStatus);

module.exports = router;
