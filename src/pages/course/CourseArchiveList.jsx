// 자료실 목록 페이지

import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel,
  Select, MenuItem, TablePagination
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import "./../ckboard.css";
import { useNavigate } from 'react-router-dom';
import { get, post } from "../../utils";

const mock = [
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(223.39)', id: "1" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "2" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "3" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "4" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "5" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "6" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "7" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "8" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "9" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "10" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "11" },
  { title: 'File I/O', date: '2023-04-27 00:00', writer: 'ㅇㅇ(39.7)', id: "12" }
]

const CourseList = [{
  id: 1,
  title: '소프트웨어공학',
}, {
  id: 2,
  title: '컴퓨터구조',
}, {
  id: 3,
  title: '컴퓨터네트워크',
}]

const CourseArchiveList = ({selectedCourseId, setSelectedCourseId}) => {
  const navigate = useNavigate();
  const rowsPerPage = 10;
  const [data, setData] = useState(mock);
  const [courseList, setCourseList] = useState(CourseList);
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleClickBoard = (id) => {
    navigate(`/courseArchive/read?id=${id}`)
  }

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
    // TODO: 해당 Course Id를 바탕으로 질문 목록 가져오기
  }

  useEffect(() => {
    get("http://localhost:8080/api/lecture/user-list")
      .then((res) => {
        console.log(res.data);
        setCourseList(res.data.courseList);
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          강의 자료실 목록
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel htmlFor="subject" filled>과목</InputLabel>
          <Select key="subject" labelId="subject" id="subject" label="과목" onChange={handleCourseChange} defaultValue={selectedCourseId}>
            {courseList && courseList.length > 0 && courseList.map((item) => (
              <MenuItem value={item.course_id} key={item.course_id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', height: "650px", flexDirection: "column", justifyContent: 'space-between', mb: 3 }}>
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
                {data && data.length > 0 &&
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                  <TableRow key={idx} onClick={() => handleClickBoard(row.id)} sx={{cursor: "pointer"}}>
                    <TableCell component="th" align="center">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.writer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination 
            sx={{width: "100%", display: "flex", justifyContent: "center", bottom: "0px"}}
            rowsPerPageOptions={-1}
            count = {data.length}
            rowsPerPage = {rowsPerPage}
            page = {page}
            onPageChange = {handleChangePage}
            labelDisplayedRows={({ from, to, count }) => `${from}/${to} `}
            labelRowsPerPage=""
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "right"}}>
          <Button variant="contained" sx={{mt: 3, mb: 3}} onClick={() => { navigate('/courseArchive/write') }}>글쓰기</Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default CourseArchiveList;