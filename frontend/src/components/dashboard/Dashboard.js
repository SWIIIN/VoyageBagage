import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTransports: 0,
    pendingTransports: 0,
    completedTransports: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/users/dashboard',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.success) {
          setStats(response.data.stats);
          setRecentActivity(response.data.recentActivity);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du tableau de bord:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {/* Statistiques */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total des transports
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalTransports}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              En attente
            </Typography>
            <Typography component="p" variant="h4">
              {stats.pendingTransports}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Terminés
            </Typography>
            <Typography component="p" variant="h4">
              {stats.completedTransports}
            </Typography>
          </Paper>
        </Grid>

        {/* Activité récente */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Activité récente
            </Typography>
            <List>
              {recentActivity.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Aucune activité récente" />
                </ListItem>
              ) : (
                recentActivity.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={activity.title}
                        secondary={activity.date}
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>
        </Grid>

        {/* Actions rapides */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Actions rapides
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                href="/create-request"
              >
                {user?.role === 'client' 
                  ? 'Nouvelle demande de transport'
                  : 'Chercher des transports'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href="/my-transports"
              >
                Voir mes transports
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 