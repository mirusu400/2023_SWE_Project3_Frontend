import * as React from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Link } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import theme from '../theme';
import HomeNotice from './components/HomeNotice';
import HomeTimeTable from './components/HomeTimeTable';
import HomeTodaysLesson from './components/HomeTodaysLesson';
import HomeDateTable from './components/HomeDateTable';
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';


const links = [
  { label: '장학금 신청 및 조회', icon: <SchoolIcon />, href: '#' },
  { label: '졸업심사서 조회', icon: <FindInPageIcon />, href: '#' },
  { label: '실시간강의 참여', icon: <VideoCameraFrontIcon />, href: '#' },
  { label: '도서구매 신청 및 조회', icon: <AutoStoriesIcon />, href: 'https://kupis.kw.ac.kr/' },
  { label: '사이트맵', icon: <PublicIcon />, href: '#' },
  { label: '조직도 및 구성', icon: <LanguageIcon />, href: '#' }
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

const widgetList = [
  {
    key: "key값1", value: (
    <Item>
      <Typography variant="h4" component="h4" sx={{ pb: 1 }}>
        공지사항
      </Typography>
      <HomeNotice />
    </Item>)
  }, {
    key: "key값2", value: (
      <Item>
        <Typography variant="h4" component="h4" sx={{ pb: 1 }}>
          시간표
        </Typography>
        <HomeTimeTable />
      </Item>
    )
  }, {
    key: "key값3", value: (
      <Item>
        <Typography variant="h4" component="h4" sx={{ pb: 1 }}>
          오늘의 수업
        </Typography>
        <HomeTodaysLesson />
      </Item>
    )
  }, {
    key: "key값4", value: (
      <Item>
        <Typography variant="h4" component="h4" sx={{ pb: 1 }}>
          학사일정
        </Typography>
        <HomeDateTable />
      </Item>
    )
  }
]

const ResponsiveGridLayout = WidthProvider(Responsive)

const DashboardDetailView = () => {
  // responsive grid에 필요한 state
  const [state, setState] = useState({
    breakpoints: 'lg',
    layouts: {
      lg: [
        { i: "key값1", x: 0, y: 0, w: 2, h: 1 },
        { i: "key값2", x: 2, y: 0, w: 1, h: 1 },
        { i: "key값3", x: 0, y: 1, w: 1, h: 1 },
        { i: "key값4", x: 1, y: 1, w: 2, h: 1 }
      ] },
  })

  // grid-layout 변경 시 사용
  const onLayoutChange = (layout, layouts) => {
    // console.log('layouts', layouts, layout)
    setState((state) => ({
      ...state,
      layouts: layouts,
    }))
  }

  // breakpoint 변경
  const onBreakPointChange = (breakpoint) => {
    // console.log(breakpoint) // lg or md or sm or xs or xxs
    setState((state) => ({
      ...state,
      breakpoints: breakpoint,
    }))
  }

  return (
    <ResponsiveGridLayout
      layouts={state.layouts}
      breakpoints={{
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0,
      }}
      cols={{ lg: 3, md: 3, sm: 3, xs: 2, xxs: 2 }}
      rowHeight={275}
      width={1000}
      onLayoutChange={onLayoutChange}
      onBreakpointChange={onBreakPointChange}
      isResizable={true}
    >
      {widgetList.map((widget, index) => (
        <Grid item key={widget.key}>
          {widget.value}
        </Grid>
      ))}
    </ResponsiveGridLayout>
  )
}


const Home = () => {

  

  

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={2} sx={{pt: 5}}>
          <Grid item xs={9}>
            <DashboardDetailView />
          </Grid>
          <Grid item xs={3} >
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {links.map(({ label, icon, href }) => (
                  <Link href={href} underline="none" key={href} sx={{ display: 'flex', alignItems: "left", flexDirection: 'row', justifyContent: "left", width: "100%", color: "black"}}>
                  <Box key={href} sx={{display: 'flex', alignItems: "left", flexDirection: 'row', justifyContent: "left", width: "100%", py: 1}}>
                    <Box sx={{pr: 1, borderRadius: "50%", borderColor: "grey.500", boxShadow: 3,
                      alignItems: "center", justifyContent: "center"}}>
                      <Box sx={{ pt: 0.75, pl: 0.75}}>
                        {icon}
                      </Box>
                    </Box>
                    <Box sx={{pt: 1, pl: 2}}>
                      {label}
                    </Box>
                  </Box>
                  </Link>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
};

export default Home;