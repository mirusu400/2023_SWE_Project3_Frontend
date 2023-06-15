import * as React from 'react';

import { styled, createTheme, ThemeProvider, createMuiTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Divider, Chip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { useEffect, useState } from 'react';
import { post, get } from '../../utils'

const mock = [
  {
    "course_id": 1,
    "lecturer_id": 1,
    "name": "테스트강의",
    "description": null,
    "semester": 3,
    "credit": 3,
    "type": "전선"
  },
  {
    "course_id": 2,
    "lecturer_id": 1,
    "name": "새빛관",
    "description": null,
    "semester": 4,
    "credit": 3,
    "type": "전필"
  }
]


const HomeTodaysLesson = () => {
  const [lectures, setLectures] = useState(mock)
  useEffect(() => {
    get("http://localhost:8080/api/lecture/user-list")
      .then((res) => {
        console.log("res.data", res.data)
        setLectures(res.data.courseList);
      })
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: "column"}}>
        {lectures && lectures.length > 0 && lectures.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", my: 0.75 }}>
            <Typography variant="span" component="span">
            [{index+1}]&nbsp;{item.name}
            </Typography>
          </Box>
        ))}
        { (!lectures || lectures.length == 0) && <Typography variant="span" component="span">수강중인 강의가 없습니다.</Typography>}
      </Box>
    </ThemeProvider>
  )
};

export default HomeTodaysLesson;