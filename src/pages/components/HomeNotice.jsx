import * as React from 'react';

import { styled, createTheme, ThemeProvider, createMuiTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';

const mock = [
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
]


const HomeNotice = () => {
  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-evenly", pb: 1}}>
        <Typography variant="h5">
          일반
        </Typography>
        <Typography variant="h5" component="h5">
          학부
        </Typography>
        <Typography variant="h5" component="h5">
          장학
        </Typography>
        <Typography variant="h5" component="h5">
          취업
        </Typography>
        <Typography variant="h5" component="h5">
          실시간베스트
        </Typography>        
      </Box>
      <Box sx={{ display: 'flex', flexDirection: "column"}}>
        {mock.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", py: 0.5}}>
            <Typography variant="span" component="span">
              {item.label}
            </Typography>
            <Typography variant="span" component="span">
              {item.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
    </ThemeProvider>
  )
};

export default HomeNotice;