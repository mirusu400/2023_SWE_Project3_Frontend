import * as React from 'react';
import { useState } from 'react';
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
import { useEffect } from 'react';
import { get, post } from "../../utils";
import dayjs from 'dayjs';

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

const CourseHomeworkList = ({selectedCourseId, setSelectedCourseId}) => {
  const navigate = useNavigate();
  const rowsPerPage = 10;
  const [data, setData] = useState(mock);
  const [childData, setChildData] = useState([]);
  const [courseList, setCourseList] = useState(CourseList);
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }


  const handleClickBoard = (id) => { navigate(`/courseRead?id=${id}`) }

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  }

  const fetchHomeworkList = () => {
    get(`http://localhost:8080/api/article/list/${selectedCourseId}`)
      .then((res) => {
        const newData = [];
        const childData = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].type === "과제") {
            if (res.data[i].parent_article_id !== null) {
              childData.push(res.data[i]);
            } else {
              newData.push(res.data[i]);
            }
          }
        }
        for (let i = 0; i < childData.length; i++) {
          for (let j = 0; j < newData.length; j++) {
            if (childData[i].parent_article_id === newData[j].id) {
              if (newData[j].child)
                newData[j].child.push(childData[i]);
              else
                newData[j].child = [childData[i]];
            }
          }
        }
        setData(newData);
      })
  }

  useEffect(() => {
    get("http://localhost:8080/api/lecture/user-list")
      .then((res) => {
        console.log(res.data);
        setCourseList(res.data.courseList);
      })
    fetchHomeworkList();
  }, [])

  useEffect(() => { fetchHomeworkList(); }, [selectedCourseId])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          강의 과제 목록
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
                  <TableCell>순서</TableCell>
                  <TableCell sx={{ width: "40%"}}>제목</TableCell>
                  <TableCell sx={{ width: "20%"}}>작성시간</TableCell>
                  <TableCell sx={{}}>작성자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.length > 0 &&
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                  <>
                    <TableRow key={idx} onClick={() => handleClickBoard(row.id)} sx={{cursor: "pointer"}}>
                      <TableCell component="th">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                      <TableCell>{row.user_name}</TableCell>
                    </TableRow>
                    {row.child && row.child.map((child, idx) => (
                      <TableRow key={idx} onClick={() => handleClickBoard(child.id)} sx={{cursor: "pointer", backgroundColor: "#F0F0F0"}}>
                        <TableCell component="th">
                          ㄴ
                        </TableCell>
                        <TableCell>{child.name}</TableCell>
                        <TableCell>{dayjs(child.created_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                        <TableCell>{child.user_name}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
                {(!data || data.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">등록된 과제가 없습니다.</TableCell>
                  </TableRow>
                )}
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
          <Button variant="contained" sx={{mt: 3, mb: 3}} onClick={() => { navigate('/courseHomework/write') }}>글쓰기</Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default CourseHomeworkList;