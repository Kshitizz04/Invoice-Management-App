import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Box, Button, Typography } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;

const myWidth = window.innerWidth;
let flexdir = myWidth < 650 ? 'column' :  'row';

const LoginPage = () => {
  const [validity, setValidity] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = async () => {
    try {
      const response = await axios.get('https://invoice-management-app-2gbe.onrender.com/api/auth/check-time');
      const serverTime = new Date(response.data.serverTime);
      const clientTime = new Date();

      console.log(clientTime, serverTime);

      const timeDifference = Math.abs(clientTime - serverTime) / 1000; // Difference in seconds

      if (timeDifference > 60) {  // Allowing a 60-second difference as acceptable
        setError('Significant time discrepancy detected. Please synchronize your device clock.');
      }
      else{
        setValidity(true);
        setMessage('No time discrepancy detected');
      }
    } catch (error) {
      console.error('Error validating time:', error);
      setError('Failed to validate time with server.');
    }
  };

  const handleValidate = ()=>{
    validate();
  }

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
        <Box sx={{
          height: '40%',
          width: '40%',
          backgroundColor:'rgba(38, 28, 92, .5)',
          borderRadius:'10px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems: 'center',
        }}>
          <Box sx={{display:'flex', margin:'2% 2% 5% 2%', flexDirection:`${flexdir}`}}>
            <Typography variant='h6' color='white' sx={{margin:'5px'}}>User can log in only after validating themselves</Typography>
            <Button variant='contained' onClick={()=>{handleValidate()}}>
              <Box>
                <Typography variant='subtitle1'>Validate Me</Typography>
              </Box>
            </Button>
          </Box>
          <Typography variant='subtitle1' sx={{color:'red'}}>{error}</Typography>
          <Typography variant='subtitle1' sx={{color:'white'}}>{message}</Typography>
          <Button disabled={!validity} onClick={()=>{navigate("/dashboard")}} variant='contained'>Log in</Button>
        </Box>
    </Box>
  );
};

export default LoginPage;

