import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'client' // ou 'transporteur'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
    // TODO: Implémenter la logique d'inscription
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        credential: credentialResponse.credential
      });
      console.log('Google login success:', response.data);
      // TODO: Gérer la réponse (redirection, stockage du token, etc.)
    } catch (error) {
      console.error('Erreur lors de l\'authentification Google:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Inscription
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Prénom"
              margin="normal"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
            
            <TextField
              fullWidth
              label="Nom"
              margin="normal"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <TextField
              fullWidth
              label="Téléphone"
              margin="normal"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Type de compte</InputLabel>
              <Select
                value={formData.role}
                label="Type de compte"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="transporteur">Transporteur</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              margin="normal"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            
            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              type="password"
              margin="normal"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            
            <Box sx={{ my: 2 }}>
              <Divider>
                <Typography variant="body2" color="text.secondary">
                  Ou s'inscrire avec
                </Typography>
              </Divider>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.log('Échec de la connexion Google');
                  }}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="signup_with"
                  locale="fr"
                />
              </Box>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              S'inscrire
            </Button>
          </form>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Déjà inscrit ?{' '}
              <Link component={RouterLink} to="/login">
                Se connecter
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 