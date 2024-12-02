import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import axios from 'axios';

const TransportersList = () => {
  const [transporters, setTransporters] = useState([]);
  const [filteredTransporters, setFilteredTransporters] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    rating: '',
    vehicle: '',
    location: ''
  });

  // Définir applyFilters avec useCallback avant son utilisation
  const applyFilters = useCallback(() => {
    let filtered = [...transporters];
    
    if (filters.search) {
      filtered = filtered.filter(t => 
        t.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.rating) {
      filtered = filtered.filter(t => t.rating >= parseFloat(filters.rating));
    }
    
    if (filters.vehicle) {
      filtered = filtered.filter(t => 
        t.vehicle.toLowerCase().includes(filters.vehicle.toLowerCase())
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(t => 
        t.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    setFilteredTransporters(filtered);
  }, [transporters, filters]);

  // Charger les transporteurs
  useEffect(() => {
    const fetchTransporters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transporters');
        setTransporters(response.data);
        setFilteredTransporters(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des transporteurs:', error);
      }
    };
    
    fetchTransporters();
  }, []);

  // Appliquer les filtres quand les transporteurs ou les filtres changent
  useEffect(() => {
    if (transporters.length > 0) {
      applyFilters();
    }
  }, [transporters, filters, applyFilters]);

  // Gérer les changements de filtres
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Filtres */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            name="search"
            label="Rechercher"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Note minimale</InputLabel>
            <Select
              name="rating"
              value={filters.rating}
              label="Note minimale"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="4.5">4.5+</MenuItem>
              <MenuItem value="4">4+</MenuItem>
              <MenuItem value="3.5">3.5+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            name="vehicle"
            label="Type de véhicule"
            value={filters.vehicle}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            name="location"
            label="Localisation"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>

      {/* Liste des transporteurs */}
      <Grid container spacing={3}>
        {filteredTransporters.map((transporter) => (
          <Grid item xs={12} sm={6} md={4} key={transporter._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {transporter.firstName} {transporter.lastName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                  <Rating value={transporter.rating} readOnly precision={0.5} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({transporter.completedTransports} transports)
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {transporter.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {transporter.specialties?.map((specialty, index) => (
                    <Chip key={index} label={specialty} size="small" />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 1 }} />
                  {transporter.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TransportersList; 