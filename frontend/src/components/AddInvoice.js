import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Box, FormControl, Input, InputLabel, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const defaultDate = new Date().toISOString().split('T')[0]

const AddInvoice = ({setInvoices, invoices})=> {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    invoiceAmount: '',
    financialYear: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleAddInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/invoices/create', newInvoice);
      setInvoices([...invoices,response.data]);
      setNewInvoice({ invoiceDate: '', invoiceNumber: '', invoiceAmount: '' });
      setOpen(false);
    } catch (err) {
      setError(`Failed to add invoice. ${err.message}`);
    }
  };

  return (
    <Box sx={{margin:'5px 0 2% 0'}}>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Invoice
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Enter Details"}</DialogTitle>
        <DialogContent>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1 } }}
                noValidate
                autoComplete="off"
            >
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Invoice Number</InputLabel>
                    <Input id="component-simple" type='number'onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                    required/>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel shrink={true}>Invoice Date</InputLabel>
                    <Input  type='date'onChange={(e) => setNewInvoice({ ...newInvoice, invoiceDate: e.target.value.substring(0,9), financialYear: e.target.value.substring(0,4) })}
                    required/>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Invoice Amount</InputLabel>
                    <Input id="component-simple" type='number'onChange={(e) => setNewInvoice({ ...newInvoice, invoiceAmount: e.target.value })}
                    required/>
                </FormControl>
            </Box>
        </DialogContent>
        <Typography variant="subtitle1" sx={{color:'red', margin:'0 0 0 3px'}}>{error}</Typography>
        <DialogActions>
          <Button onClick={(e)=>{handleAddInvoice(e)}}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddInvoice