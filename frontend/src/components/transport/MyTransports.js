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

const MyTransports = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/requests/my-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransports(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors du chargement des transports");
      } finally {
        setLoading(false);
      }
    };

    fetchTransports();
  }, []);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user?.role === 'transporteur' ? 'Mes Transports' : 'Mes Demandes'}
      </Typography>

      <Grid container spacing={3}>
        {transports.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">
              Aucun transport trouvé.
            </Alert>
          </Grid>
        ) : (
          transports.map((transport) => (
            <Grid item xs={12} md={6} key={transport._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {transport.title}
                  </Typography>
                  
                  <Typography color="textSecondary" gutterBottom>
                    {transport.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Départ:</strong> {transport.departureCity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Arrivée:</strong> {transport.arrivalCity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Date:</strong> {new Date(transport.departureDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Prix:</strong> {transport.price}€
                    </Typography>
                    <Typography variant="body2">
                      <strong>Statut:</strong>{' '}
                      <Chip 
                        label={transport.status} 
                        color={
                          transport.status === 'completed' ? 'success' :
                          transport.status === 'pending' ? 'warning' :
                          transport.status === 'accepted' ? 'info' : 'error'
                        }
                        size="small"
                      />
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={`${transport.weight}kg`} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={transport.bagageType} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    {transport.fragile && (
                      <Chip 
                        label="Fragile" 
                        color="warning" 
                        size="small" 
                        sx={{ mr: 1 }}
                      />
                    )}
                  </Box>

                  {transport.status === 'pending' && user?.role === 'transporteur' && (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => {/* Ajouter la logique pour accepter */}}
                    >
                      Accepter le transport
                    </Button>
                  )}

                  {transport.status === 'accepted' && (
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => {/* Ajouter la logique pour marquer comme terminé */}}
                    >
                      Marquer comme terminé
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default MyTransports; 