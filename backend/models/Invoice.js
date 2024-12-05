const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  invoiceDate: {
    type: Date,
    required: true
  },
  invoiceAmount: {
    type: Number,
    required: true
  },
  financialYear: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
