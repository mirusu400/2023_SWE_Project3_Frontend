import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


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

const LoginInternalRegister = (props) => {

  const [dob, setDob] = useState(new Date());

  
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    axios.defaults.crossDomain = true;

    //TODO: Register API
    axios.post('http://localhost:8080/api/signup', {
      username: data.get('username'),
      password: data.get('password'),
      name: data.get('name'),
      semester: 0,
      gender: 0,
      dob: dob.toISOString().split('T')[0],
      phone_number: data.get('phone-number'),
      email: data.get('email'),
    }, {
      withCredentials: true,
    }).then((response) => {
      window.location.href = '/';
    })
  };

  const handleDob = (date) => {
    console.log(date.$d);
    setDob(date.$d);
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
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, mx: 8 }}>
          <TextField
            margin="normal" required fullWidth
            id="name" label="사용자 이름" name="name"
            autoComplete="name" autoFocus
          />
          <TextField
            margin="normal" required fullWidth
            id="username" label="아이디" name="username"
            autoComplete="username" autoFocus
          />
          <TextField
            margin="normal" required fullWidth
            id="email" label="이메일" name="email"
            autoComplete="email" autoFocus
          />
          <TextField
            margin="normal" required fullWidth
            name="password" label="비밀번호" type="password" id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal" required fullWidth
            name="password" label="비밀번호 재확인" type="password" id="password2"
            autoComplete="current-password"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="생년월일" name="dob" id="dob"
              sx={{ width: "100%" }}
              onChange={handleDob}
              inputFormat="YYYY-MM-DD"
            />
          </LocalizationProvider>
          <TextField
            margin="normal" required fullWidth
            name="phone-number" label="휴대전화" id="phone-number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>
              <Button variant="body2" onClick={() => { props.setCurrentState("login") }}>
                {"로그인"}
              </Button>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LoginInternalRegister;