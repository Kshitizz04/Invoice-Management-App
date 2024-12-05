const Invoice = require('../models/Invoice');

// Create Invoice
exports.createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, invoiceDate, invoiceAmount, financialYear } = req.body;

    // Validate unique invoice number within the financial year
    const existingInvoice = await Invoice.findOne({ invoiceNumber, financialYear });
    if (existingInvoice) {
      return res.status(400).json({ message: "Invoice number must be unique within the financial year." });
    }

    const invoice = new Invoice({ invoiceNumber, invoiceDate, invoiceAmount, financialYear });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Invoice
exports.updateInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const updateData = req.body;

    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber },
      updateData,
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;

    const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber });

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get All Invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Filter Invoices
exports.filterInvoices = async (req, res) => {
  try {
    const { financialYear, invoiceNumber, startDate, endDate } = req.body;

    let filterCriteria = {};

    if (financialYear) filterCriteria.financialYear = financialYear;
    if (invoiceNumber) filterCriteria.invoiceNumber = invoiceNumber;
    if (startDate && endDate) {
      filterCriteria.invoiceDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const invoices = await Invoice.find(filterCriteria);
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
