import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Alert,
} from '@mui/material';

const AvailableRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/requests/available', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors du chargement des demandes");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Demandes de transport disponibles
      </Typography>

      <Grid container spacing={3}>
        {requests.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">
              Aucune demande disponible pour le moment.
            </Alert>
          </Grid>
        ) : (
          requests.map((request) => (
            <Grid item xs={12} md={6} key={request._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {request.title}
                  </Typography>
                  
                  <Typography color="textSecondary" gutterBottom>
                    {request.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Départ:</strong> {request.departureCity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Arrivée:</strong> {request.arrivalCity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Date:</strong> {new Date(request.departureDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Prix:</strong> {request.price}€
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={`${request.weight}kg`} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={request.bagageType} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    {request.fragile && (
                      <Chip 
                        label="Fragile" 
                        color="warning" 
                        size="small" 
                        sx={{ mr: 1 }}
                      />
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => {/* Ajouter la logique pour accepter la demande */}}
                  >
                    Accepter la demande
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AvailableRequests; 