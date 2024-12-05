import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, Input, InputLabel, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddInvoice from '../components/AddInvoice';
import UpdateInvoice from '../components/UpdateInvoice';
const apiUrl = process.env.REACT_APP_API_URL;

const MainContainer = styled(Box)({
  height: '90vh',
  width: '75vw',
  backgroundColor:'rgba(38, 28, 92, .5)',
  borderRadius:'10px',
  display:'flex',
  flexDirection:'column',
  alignItems: 'center',
  color:'white'
})

const StyledTableCell = styled(TableCell)({
  color:'white',
  fontsize:'50px',
  fontWeight:'200'
})

const StyledTableHeadCell = styled(TableCell)({
  color:'white',
  fontsize:'50px',
  fontWeight:'200',
  backgroundColor:'rgba(76, 46, 172)'
})

const StyledInputLabel = styled(InputLabel)({
  color:'white',
})
const StyledInput = styled(Input)({
  color:'white',
})

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [filters, setFilters] = useState({
    financialYear: '',
    invoiceNumber: '',
    startDate: '',
    endDate: ''
  }); 

  // Fetch all invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${apiUrl}/invoices`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const applyFilters = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/invoices/filter`, filters);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const handleDeleteInvoice = async (id) => {
    console.log(id)
    try {
      await axios.delete(`${apiUrl}/invoices/delete/${id}`);
      setInvoices(invoices.filter(invoice => invoice.invoiceNumber !== id));
    } catch (err) {
      console.error('Failed to delete invoice.');
    }
  };

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <MainContainer>

        <Typography variant='h4' sx={{margin:'2%'}}>Dashboard</Typography>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <FormControl variant="standard">
              <StyledInputLabel>Search by Invoice No.</StyledInputLabel>
              <StyledInput id="component-simple" type='number'onChange={(e) => setFilters({ ...filters, invoiceNumber: e.target.value })}
              required defaultValue=""/>
          </FormControl>
          <FormControl variant="standard">
              <StyledInputLabel htmlFor="component-simple">Search by year</StyledInputLabel>
              <StyledInput  type='number'onChange={(e) => setFilters({ ...filters, financialYear: e.target.value })}
              required/>
          </FormControl>
          <FormControl variant="standard">
              <StyledInputLabel htmlFor="component-simple" shrink={true}>Enter start date</StyledInputLabel>
              <StyledInput id="component-simple" type='date'onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              required/>
          </FormControl>
          <FormControl variant="standard">
              <StyledInputLabel htmlFor="component-simple" shrink={true}>Enter end date</StyledInputLabel>
              <StyledInput id="component-simple" type='date'onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              required/>
          </FormControl>
          <Button variant='contained' onClick={applyFilters}>Apply Filters</Button>
        </Box>

        <TableContainer sx={{maxWidth:'80%', margin:'10px', height:'70%'}}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Invoice Number</StyledTableHeadCell>
                <StyledTableHeadCell>Invoice Date</StyledTableHeadCell>
                <StyledTableHeadCell>Invoice Amount</StyledTableHeadCell>
                <StyledTableHeadCell>Financial Year</StyledTableHeadCell>
                <StyledTableHeadCell>Actions</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice,index)=>(
                <TableRow key={index}>
                  <StyledTableCell>{invoice.invoiceNumber}</StyledTableCell>
                  <StyledTableCell>{invoice.invoiceDate.substring(0,10)}</StyledTableCell>
                  <StyledTableCell>{invoice.invoiceAmount}</StyledTableCell>
                  <StyledTableCell>{invoice.financialYear}</StyledTableCell>
                  <StyledTableCell>
                    <UpdateInvoice invoices={invoices} setInvoices={setInvoices} invoiceNumber={invoice.invoiceNumber} force={forceRerender} setForce={setForceRerender}/>
                    <Button variant='contained' onClick={(e)=>{handleDeleteInvoice(invoice.invoiceNumber)}} sx={{margin:'0 0 0 5px'}}>Delete</Button>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddInvoice setInvoices = {setInvoices} invoices = {invoices}/>
      </MainContainer>
    </Box>
  );
};

export default Dashboard;
