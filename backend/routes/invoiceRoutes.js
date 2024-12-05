const express = require('express');
const router = express.Router();
const {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllInvoices,
  filterInvoices 
} = require('../controllers/invoiceController');

// CRUD operations
router.post('/create', createInvoice);
router.put('/update/:invoiceNumber', updateInvoice);
router.delete('/delete/:invoiceNumber', deleteInvoice);
router.get('/', getAllInvoices);
router.post('/filter', filterInvoices);

module.exports = router;
