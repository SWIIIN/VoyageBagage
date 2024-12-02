import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, Link } from 'react-router-dom';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const pages = [
    { title: 'Accueil', path: '/' },
    { title: 'Transporteurs', path: '/transporters' },
    { title: 'FAQ', path: '/faq' },
  ];
  const userMenuItems = user 
    ? ['Mon Profil', 'Tableau de bord', 'Déconnexion']
    : ['Connexion', 'Inscription'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    handleCloseUserMenu();
    switch(item) {
      case 'Mon Profil':
        navigate('/profile');
        break;
      case 'Tableau de bord':
        navigate('/dashboard');
        break;
      case 'Déconnexion':
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
        break;
      case 'Connexion':
        navigate('/login');
        break;
      case 'Inscription':
        navigate('/register');
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: { xs: 1, md: 0 },
              mr: 2
            }}
          >
            VoyageBagage
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/"
              sx={{ color: 'white' }}
            >
              Accueil
            </Button>
            <Button
              component={Link}
              to="/transporters"
              sx={{ color: 'white' }}
            >
              Transporteurs
            </Button>
            <Button
              component={Link}
              to="/faq"
              sx={{ color: 'white' }}
            >
              FAQ
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Connexion
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/register"
            >
              Inscription
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
              >
                Accueil
              </MenuItem>
              <MenuItem
                component={Link}
                to="/transporters"
                onClick={handleCloseNavMenu}
              >
                Transporteurs
              </MenuItem>
              <MenuItem
                component={Link}
                to="/faq"
                onClick={handleCloseNavMenu}
              >
                FAQ
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 