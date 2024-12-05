import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Box,FormControl, Input, InputLabel, Typography } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

const Transition = React.forwardRef(function Transition(props,ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const UpdateInvoice = ({setInvoices, invoices, invoiceNumber, force, setForce})=> {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [updateInvoice, setUpdateInvoice] = useState({
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


  const handleUpdateInvoice = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put('https://invoice-management-app-2gbe.onrender.com/api/invoices/update/${invoiceNumber}', updateInvoice);
        setInvoices((prevState)=>
            prevState.map((invoice)=>
                invoice.invoiceNumber === invoiceNumber ? response.data : invoice
            )
        )
        setUpdateInvoice({ invoiceDate: '', invoiceNumber: '', invoiceAmount: '' });
        setForce(!force)
        setOpen(false);
    } catch (err) {
      setError(`Failed to update invoice. ${err.message}`);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Update
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
                    <InputLabel shrink={true}>Invoice Date</InputLabel>
                    <Input  type='date'onChange={(e) => setUpdateInvoice({ ...updateInvoice, invoiceDate: e.target.value.substring(0,9), financialYear: e.target.value.substring(0,4) })}
                    required />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Invoice Amount</InputLabel>
                    <Input id="component-simple" type='number'onChange={(e) => setUpdateInvoice({ ...updateInvoice, invoiceAmount: e.target.value })}
                    required/>
                </FormControl>
            </Box>
        </DialogContent>
        <Typography variant="subtitle1" sx={{color:'red', margin:'0 0 0 3px'}}>{error}</Typography>
        <DialogActions>
          <Button onClick={(e)=>{handleUpdateInvoice(e)}}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UpdateInvoice