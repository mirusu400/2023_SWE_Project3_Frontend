// 공지 페이지

import * as React from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import "./../ckboard.css";
import { useNavigate } from 'react-router-dom';

const mock = [
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(223.39)', id: "1" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "2" },
]



const CourseNotificationList = ({selectedCourseId, setSelectedCourseId}) => {
  const navigate = useNavigate();

  const [data, setData] = useState(mock);

  const handleClickBoard = (id) => {
    navigate(`/courseQuestion/read?id=${id}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          강의 공지사항 목록
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{textAlign: "center"}}>순서</TableCell>
                <TableCell sx={{textAlign: "center", width: "40%"}}>제목</TableCell>
                <TableCell sx={{textAlign: "center", width: "20%"}}>작성시간</TableCell>
                <TableCell sx={{textAlign: "center"}}>작성자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx} onClick={() => handleClickBoard(row.id)}>
                  <TableCell component="th" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.writer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" sx={{mt: 3, mb: 3}} onClick={() => { navigate('/courseQuestion/write') }}>글쓰기</Button>

      </Container>
    </ThemeProvider>
  )
};

export default CourseNotificationList;