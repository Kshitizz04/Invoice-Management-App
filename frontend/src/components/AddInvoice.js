import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Box, FormControl, Input, InputLabel, Typography } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const defaultDate = new Date().toISOString().split('T')[0]

const AddInvoice = ({setInvoices, invoices})=> {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    invoiceDate: defaultDate,
    invoiceAmount: '',
    financialYear: defaultDate.substring(0,4)
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError("");
    setNewInvoice({ invoiceDate: defaultDate, invoiceNumber: '', invoiceAmount: '' , financialYear: defaultDate.substring(0,4)});
    setOpen(false);
  };


  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if(newInvoice.invoiceNumber===''|| newInvoice.invoiceAmount===''){
      setError("Failed to add invoice. Some fields are missing")
    }
    else{
      try {
        const response = await axios.post('https://invoice-management-app-2gbe.onrender.com/api/invoices/create', newInvoice);
        setInvoices([...invoices,response.data]);
        setNewInvoice({ invoiceDate: defaultDate, invoiceNumber: '', invoiceAmount: '' , financialYear: defaultDate.substring(0,4)});
        handleClose();
      } catch (err) {
        setError(`Failed to add invoice. ${err.response.data.message}`);
      }
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
                    required value={newInvoice.invoiceNumber}/>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel shrink={true}>Invoice Date</InputLabel>
                    <Input  type='date'onChange={(e) => setNewInvoice({ ...newInvoice, invoiceDate: e.target.value.substring(0,9), financialYear: e.target.value.substring(0,4) })}
                    required value={new Date(newInvoice.invoiceDate).toISOString().split('T')[0]}/>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Invoice Amount</InputLabel>
                    <Input id="component-simple" type='number'onChange={(e) => setNewInvoice({ ...newInvoice, invoiceAmount: e.target.value })}
                    required value={newInvoice.invoiceAmount}/>
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
