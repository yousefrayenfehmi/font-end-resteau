import * as React from 'react';
import { useEffect,useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { margin, styled } from '@mui/system';
import { creatcontexte } from '../createContext/createcontext';
import { Link } from 'react-router-dom';
import Creattexto from '../createContext/createcontext';
import MediaControlCard from '../itemorder/itemorder';
import axios from 'axios';
const pages = ['Menu', 'suivi_commande'];
const settings = ['hhhhh','hhhhh','hhhh'];
// Define keyframes using @mui/system's keyframes utility
const lightSweep = `
  @keyframes lightSweep {
    0% {
      background-position: center left;
    }
    50% {
      background-position: center center;
    }
    100% {
      background-position: center right;
    }
  }
`;
// Create a styled AppBar component
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderTop: '2px solid transparent',
  borderBottom: '2px solid transparent',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '1px',
    backgroundImage: 'url(/img/gold-line.png)', // Path to your image
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: `lightSweep 2s infinite`, // Apply the animation
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '1px',
    backgroundImage: 'url(/img/gold-line.png)', // Path to your image
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: `lightSweep 2s infinite`, // Apply the animation
  },
  '@global': {
    '@keyframes lightSweep': {
      '0%': {
        backgroundPosition: 'center left',
      },
      '50%': {
        backgroundPosition: 'center center',
      },
      '100%': {
        backgroundPosition: 'center right',
      },
    },
  },
}));

function ResponsiveAppBar({Numtab}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {cart,addcart,videcart}=useContext(creatcontexte)
  const [somme,setsomme]=React.useState(0);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  useEffect(()=>{
    console.log('hhhhhhhhh:');
    
  },[cart])
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
const calsulesomme=()=>{
      var s=0
      for (let index = 0; index < cart.length; index++) {
         s =s+parseInt(cart[index].value)
        
      }
      return s
}
const commande=async()=>{
  const select = cart.map((prev) => {
    return prev.taille === undefined ? 
      { id: prev.id,prix:prev.value,etat:'en-cour' } : 
      { id: prev.id,taille:prev.taille,prix:prev.value,etat:'en-cour' };
  });

  await axios.post('http://localhost:3000/commande',{idtab:Numtab ,orders: select,etat_commande:'non-confirmer',total:calsulesomme(),date:new Date().toISOString().substring(0, 10)}).then(Response=>{
        console.log(Response.data);
        videcart()
  }).catch(err=>{
    console.log(err);
  })

  
}
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <CustomAppBar position="static">
      {cart.map(prev=>{
        console.log(prev)
      })
      }
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            wiiiiii
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to={`/menu/${Numtab}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Menu
                </Button>
                </Link>
            <Link to={`/suivi_commande/${Numtab}`}>
        
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  suivi_commande
                </Button>
                </Link>
                
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={handleOpenUserMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cart.length}
            </div>
          </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              {cart.map((setting,index) => (
               
                <MenuItem key={index}>
                  <MediaControlCard key={index} id={index} taille={setting.taille} prix={setting.value} type={setting.Name
}/>
                </MenuItem>
                
              ))}
                    <h1 style={{ 
          color: '#333', // Couleur du texte
          fontSize: '24px', // Taille de la police
          textAlign: 'center', // Alignement du texte
          margin: '20px 0', // Marges en haut et en bas
          fontWeight: 'bold' // Poids de la police
        }}>
        </h1>
        {cart.length>0?   <div>
        <h1>Totale: {calsulesomme()} DT</h1>

            <Button 
  sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '0 auto', 
    width: '90%', // Étendre le bouton jusqu'au bord du conteneur
    maxWidth: '400px' // Optionnel: Limiter la largeur maximale
  }} 
  onClick={commande}
  variant="contained" 
  disableElevation
>
  Commander
</Button>
</div>:
<Typography
        variant="h1"
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '1.5rem', // Smaller font size
          color: 'gris', // White text color
          padding: '10px',
          paddingBottom: '20px',
          textAlign: 'center',
        }}
      >
        Pannier est vide
      </Typography>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </CustomAppBar>
  );
}

export default ResponsiveAppBar;
