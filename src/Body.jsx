import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Draggable from 'react-draggable';
import MainListItems from './ListItems';
import Router from './Router';
import Header from './Header';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import LearnTokTok from './pages/LearnTokTok';
import axios from 'axios';
import { post, get } from './utils';
import { useCookies } from 'react-cookie';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        광운대학교 LMS 서비스 
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [userData, setUserData] = useState({})
  const [cookie, setCookie] = useCookies(['JWT'])

  useEffect(() => {
    const getUserData = async () => {
      get("http://localhost:8080/api/user")
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            setCookie('JWT', '', { path: '/' })
            document.location.href = '/';
          } else {
            setUserData(response.data);
          }
        })
        .catch((error) => {
          setCookie('JWT', '', { path: '/' })
          document.location.href = '/';
        })
    }
    
    getUserData();
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header toggleDrawer={toggleDrawer} open={open} data={userData} />
          
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                py: '44px',
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <MainListItems />
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
              <Router />
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>

        {/* 학습톡톡 부분 */}
        {/* Using absolute right bottom */}
        {/* <Box sx={{ position: 'absolute', width: "100%", height: "100%" }}> */}
        <Draggable>
          <Box sx={{ position: 'absolute', bottom: 0, right: 0, p: 3, zIndex: 1 }}>
            
            <LearnTokTok />
          </Box>
        </Draggable>
        {/* </Box> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}
