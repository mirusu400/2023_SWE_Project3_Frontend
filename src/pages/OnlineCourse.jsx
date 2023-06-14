import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../theme';
import "./ckboard.css";
import { useNavigate } from 'react-router-dom';

const mock = [
  { title: 'File I/O', start: '2023-04-27 00:00', end: '2023-05-01 00:00', progress: '10%' },
  { title: 'File I/O', start: '2023-04-27 00:00', end: '2023-05-01 00:00', progress: '10%' },
]





const OnlinCourse = () => {

  const navigate = useNavigate();
  const [lecture, setLecture] = useState(mock);

  const handleWriteLecture = () => {
    navigate("/onlineCourse/write");
  }

  
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          온라인강의
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{textAlign: "center"}}>회차</TableCell>
                <TableCell sx={{textAlign: "center", width: "35%"}}>제목</TableCell>
                <TableCell sx={{textAlign: "center", width: "20%"}}>학습기간</TableCell>
                <TableCell sx={{textAlign: "center", width: "10%"}}>학습진도율</TableCell>
                <TableCell sx={{textAlign: "center"}}>강의보기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mock.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.start}<br />{row.end}</TableCell>
                  <TableCell align="center">{row.progress}</TableCell>
                  
                  <TableCell align="center">
                    <Button variant="contained" href="#contained-buttons">
                      강의 시청하기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" sx={{ my: 3}} onClick={() => { handleWriteLecture();}}>
          강의 추가
        </Button>
      </Container>
    </ThemeProvider>
  )
};

export default OnlinCourse;