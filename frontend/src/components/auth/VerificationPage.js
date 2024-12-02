import React, { useState } from 'react';
import { Container, Paper, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';
import axios from 'axios';

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('email');

  const handleVerification = async () => {
    try {
      const response = await axios.post('/api/auth/verify', {
        method: verificationMethod,
        code: verificationCode
      });
      
      if (response.data.success) {
        // Rediriger vers le dashboard
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Vérification du compte
        </Typography>
        
        <FormControl component="fieldset">
          <RadioGroup
            value={verificationMethod}
            onChange={(e) => setVerificationMethod(e.target.value)}
          >
            <FormControlLabel 
              value="email" 
              control={<Radio />} 
              label="Email" 
            />
            <FormControlLabel 
              value="phone" 
              control={<Radio />} 
              label="Téléphone" 
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="Code de vérification"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleVerification}
          sx={{ mt: 2 }}
        >
          Vérifier
        </Button>
      </Paper>
    </Container>
  );
};

export default VerificationPage; 