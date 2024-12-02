import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import {
  LocalShipping,
  LocationOn,
  Search,
  CompareArrows,
  CheckCircle,
  VerifiedUser,
  Security,
  Speed,
  Support
} from '@mui/icons-material';

const HomePage = () => {
  const [stats] = useState({
    totalUsers: 1250,
    totalTransporters: 48,
    totalRequests: 3567,
    totalCompletedRequests: 3128
  });

  const [topTransporters] = useState([
    {
      _id: '1',
      firstName: 'Hassan',
      lastName: 'Alami',
      rating: 4.8,
      completedTransports: 156,
      description: 'Spécialiste du transport express entre Casablanca et Rabat. Plus de 10 ans d\'expérience.',
      specialties: ['Express', 'Meubles', 'Fragile'],
      image: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=500&q=80',
      priceRange: '300-800 DH',
      vehicle: 'Mercedes Sprinter 2022'
    },
    {
      _id: '2',
      firstName: 'Karim',
      lastName: 'Benjelloun',
      rating: 4.9,
      completedTransports: 203,
      description: 'Transport sécurisé dans tout le Maroc. Spécialiste des longues distances.',
      specialties: ['Longue distance', 'Déménagement', 'Sécurisé'],
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&q=80',
      priceRange: '400-1200 DH',
      vehicle: 'Renault Master'
    },
    {
      _id: '3',
      firstName: 'Fatima',
      lastName: 'Moussaoui',
      rating: 4.7,
      completedTransports: 178,
      description: 'Service de transport professionnel entre Tanger et Tétouan. Satisfaction garantie.',
      specialties: ['Express', 'Bagages', 'International'],
      image: 'https://images.unsplash.com/photo-1619253297616-9f1863307079?w=500&q=80',
      priceRange: '250-600 DH',
      vehicle: 'Ford Transit'
    }
  ]);

  const [vehicleType, setVehicleType] = useState('petit');
  const [transportType, setTransportType] = useState('express');

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container className="hero-content">
          <Typography variant="h2" className="hero-title" color="white">
            Transport de bagages au Maroc
          </Typography>
          <Typography variant="h5" className="hero-subtitle" color="white">
            Trouvez un transporteur de confiance pour vos bagages
          </Typography>
          <Box sx={{ mt: 4, px: 2, width: '100%' }}>
            <Paper className="search-box" sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Trouvez le transport idéal pour vos besoins
                  </Typography>
                </Grid>
                
                {/* Première ligne */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Ville de départ"
                    variant="outlined"
                    placeholder="D'où partez-vous ?"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Ville d'arrivée"
                    variant="outlined"
                    placeholder="Où allez-vous ?"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date de transport"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Deuxième ligne */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Type de véhicule</InputLabel>
                    <Select
                      label="Type de véhicule"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      <MenuItem value="petit">Petit véhicule</MenuItem>
                      <MenuItem value="camionnette">Camionnette</MenuItem>
                      <MenuItem value="camion">Camion</MenuItem>
                      <MenuItem value="remorque">Remorque</MenuItem>
                      <MenuItem value="frigorifique">Véhicule frigorifique</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Type de transport</InputLabel>
                    <Select
                      label="Type de transport"
                      value={transportType}
                      onChange={(e) => setTransportType(e.target.value)}
                    >
                      <MenuItem value="express">Express</MenuItem>
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="economique">Économique</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Search />}
                    sx={{ height: '56px' }}
                  >
                    Rechercher
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </div>

      {/* Comment ça marche Section */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Comment ça marche ?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <Search sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  1. Recherchez
                </Typography>
                <Typography color="text.secondary">
                  Indiquez votre ville de départ, d'arrivée et vos préférences de transport
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <CompareArrows sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  2. Comparez
                </Typography>
                <Typography color="text.secondary">
                  Consultez les profils des transporteurs, leurs tarifs et leurs avis
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <CheckCircle sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  3. Réservez
                </Typography>
                <Typography color="text.secondary">
                  Choisissez votre transporteur et effectuez votre réservation en toute sécurité
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pourquoi nous choisir Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Pourquoi choisir VoyageBagage ?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <VerifiedUser sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Transporteurs vérifiés
                </Typography>
                <Typography color="text.secondary">
                  Tous nos transporteurs sont soigneusement sélectionnés
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Paiement sécurisé
                </Typography>
                <Typography color="text.secondary">
                  Vos transactions sont 100% sécurisées
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Speed sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Service rapide
                </Typography>
                <Typography color="text.secondary">
                  Transport express disponible
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Support sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Support 24/7
                </Typography>
                <Typography color="text.secondary">
                  Notre équipe est toujours là pour vous aider
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.100' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className="stat-card">
                <Typography variant="h3" className="stat-value">
                  {stats.totalUsers}
                </Typography>
                <Typography>Utilisateurs</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className="stat-card">
                <Typography variant="h3" className="stat-value">
                  {stats.totalTransporters}
                </Typography>
                <Typography>Transporteurs</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className="stat-card">
                <Typography variant="h3" className="stat-value">
                  {stats.totalRequests}
                </Typography>
                <Typography>Demandes</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper className="stat-card">
                <Typography variant="h3" className="stat-value">
                  {stats.totalCompletedRequests}
                </Typography>
                <Typography>Livraisons réussies</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Top Transporters Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.100' }}>
        <Container>
          <Typography variant="h4" className="section-title">
            Nos meilleurs transporteurs
          </Typography>
          <Grid container spacing={4}>
            {topTransporters.map((transporter) => (
              <Grid item key={transporter._id} xs={12} sm={6} md={4}>
                <Card className="transporter-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={transporter.image}
                    alt={`${transporter.firstName} ${transporter.lastName}`}
                    className="transporter-image"
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6">
                        {transporter.firstName} {transporter.lastName}
                      </Typography>
                      <Chip
                        label={transporter.priceRange}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={transporter.rating} readOnly precision={0.1} size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({transporter.completedTransports} transports)
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {transporter.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {transporter.specialties.map((specialty, index) => (
                        <Chip
                          key={index}
                          label={specialty}
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <LocalShipping sx={{ fontSize: 20, mr: 1 }} />
                      <Typography variant="body2">
                        {transporter.vehicle}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage; 