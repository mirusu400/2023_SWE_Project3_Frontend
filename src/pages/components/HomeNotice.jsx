import * as React from 'react';

import { styled, createTheme, ThemeProvider, createMuiTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { useEffect } from 'react';
import { get } from '../../utils';
import { useState } from 'react';
import dayjs from 'dayjs';

const mock = [
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#', date: '2022-01-01' },
]


const HomeNotice = () => {

  const [data, setData] = useState(mock)
  useEffect(() => {
    get("http://localhost:8080/api/user")
      .then(async (res) => {
        const articles = []
        const lectureList = res.data.lectureList;
        for (const lecture of lectureList) {
          const course = await get(`http://localhost:8080/api/article/list/${lecture}`);
          for (const article of course.data) {
            if (article.type === "공지사항") {
              articles.push(article);
            }
          }
        }
        setData(articles);
      })
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-evenly", py: 1}}>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: "column"}}>
          {(data && data.length > 0) ? data.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", py: 0.5}}>
              <Typography variant="span" component="span">
                [{item.user_name}]&nbsp;{item.name}
              </Typography>
              <Typography variant="span" component="span">
                {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </Typography>
            </Box>
          )) : (
            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", py: 0.5}}>
              <Typography variant="span" component="span">
                공지사항이 없습니다.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default HomeNotice;