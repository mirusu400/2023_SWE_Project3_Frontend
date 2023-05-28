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


const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={2} sx={{pt: 5}}>
          <Grid item xs={9}>
            <Grid container spacing={2} >
              <Grid item xs={8}>
                <Item>
                  <Typography variant="h4" component="h4" sx={{pb: 1}}>
                    공지사항
                  </Typography>
                  <HomeNotice />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Typography variant="h4" component="h4" sx={{pb: 1}}>
                    시간표
                  </Typography>
                  <HomeTimeTable />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Typography variant="h4" component="h4" sx={{pb: 1}}>
                    오늘의 수업
                  </Typography>
                  <HomeTodaysLesson />
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <Typography variant="h4" component="h4" sx={{pb: 1}}>
                    학사일정
                  </Typography>
                  <HomeDateTable />
                </Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} >
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <ul>
                {links.map(({ label, icon, href }) => (
                  <li key={href}>
                    {label}
                  </li>
                ))}
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
};

export default Home;