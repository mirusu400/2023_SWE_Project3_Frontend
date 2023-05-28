import * as React from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../theme';
import HomeNotice from './components/HomeNotice';
import HomeTimeTable from './components/HomeTimeTable';
import HomeTodaysLesson from './components/HomeTodaysLesson';
import HomeDateTable from './components/HomeDateTable';
const links = [
  { label: '장학금 신청 및 조회', icon: <ChevronLeftIcon />, href: '#' },
  { label: '졸업심사서 조회', icon: <ChevronLeftIcon />, href: '#' },
  { label: '실시간강의 참여', icon: <ChevronLeftIcon />, href: '#' },
  { label: '온라인 녹화강의 시청', icon: <ChevronLeftIcon />, href: '#' },
  { label: '도서구매 신청 및 조회', icon: <ChevronLeftIcon />, href: '#' },
  { label: '사이트맵', icon: <ChevronLeftIcon />, href: '#' },
  { label: '조직도 및 구성', icon: <ChevronLeftIcon />, href: '#' }
]


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  textAlign: 'left',
  height: '270px',
  
}));


const OnlineLecture = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1'>
          온라인강의
        </Typography>
      </Container>
    </ThemeProvider>
  )
};

export default OnlineLecture;