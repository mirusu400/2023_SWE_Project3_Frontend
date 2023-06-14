import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Cookies } from 'react-cookie';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        LMS 서비스 (소프트웨어공학)
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const LoginInternalLogin = (props) => {

  const [isError, setIsError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });

    axios.defaults.crossDomain = true;

    //TODO:login API
    axios.post('http://localhost:8080/api/login', {
      username: data.get('username'),
      password: data.get('password'),
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        // add cookies
        const cookies = new Cookies();
        cookies.set('JWT', response.data.token, { path: '/' });
        window.location.href = "/";
      }
    }).catch((error) => {
      console.log(error);
      setIsError(true)
    });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, mx: 7 }}>
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="사용자 이름"
            name="username"
            autoComplete="username"
            autoFocus

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {isError ? <Typography color="red">아이디 또는 비밀번호를 확인해 주세요</Typography> : <Typography>&nbsp;</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Button href="#" variant="body2">
                비밀번호 찾기
              </Button>
            </Grid>
            <Grid item>
              <Button variant="body2" onClick={() => { props.setCurrentState("register") }}>
                {"회원가입"}
              </Button>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LoginInternalLogin;