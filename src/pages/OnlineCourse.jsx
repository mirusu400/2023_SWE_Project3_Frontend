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
import theme from '../theme';
import "./ckboard.css";
import { useNavigate } from 'react-router-dom';
import { get, post } from '../utils';
import dayjs from 'dayjs';

const mock = [{
  "id": 1,
  "course_id": 1,
  "classroom": "새빛관",
  "lecture_name": "123",
  "begin_at": "2023-06-16T02:14:51",
  "end_at": "2023-06-23T00:00:00"
}]

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



const OnlineCourse = ({selectedCourseId, setSelectedCourseId}) => {

  const navigate = useNavigate();
  const [lectures, setLectures] = useState(mock);
  const [courseList, setCourseList] = useState(CourseList);

  const handleWriteLecture = () => {
    navigate("/onlineCourse/write");
  }

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  }

  const handleWatchLecture = (id) => {
    post(`http://localhost:8080/api/lecture/list-video`, {
      lectureId: id
    })
      .then((res) => {
        window.open("http://localhost:8080" + res.data[0].video_url.replace("\\\\", "/"), "_blank")
      })
    post("http://localhost:8080/api/lecture/attend", {
      lectureId: id
    })
      .then((res) => {
        alert("출석되었습니다.")
      })
  }

  const fetchQuestionList = () => {
    get(`http://localhost:8080/api/course/get-course?id=${selectedCourseId}`)
      .then((res) => {
        const newData = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].type === "질문과답변") {
            newData.push(res.data[i]);
          }
        }
        setLectures(res.dat[3]);
      })
  }

  useEffect(() => {
    get("http://localhost:8080/api/lecture/user-list")
      .then((res) => {
        setCourseList(res.data.courseList);
      })
    fetchQuestionList();
  }, [])

  useEffect(() => { fetchQuestionList(); }, [selectedCourseId]);

  


  
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          온라인강의
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel htmlFor="subject" filled>과목</InputLabel>
          <Select key="subject" labelId="subject" id="subject" label="과목" onChange={handleCourseChange} defaultValue={selectedCourseId}>
            {courseList && courseList.length > 0 && courseList.map((item) => (
              <MenuItem value={item.course_id} key={item.course_id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{textAlign: "center"}}>회차</TableCell>
                <TableCell sx={{textAlign: "center", width: "35%"}}>제목</TableCell>
                <TableCell sx={{textAlign: "center", width: "20%"}}>학습기간</TableCell>
                <TableCell sx={{textAlign: "center", width: "10%"}}>강의실</TableCell>
                <TableCell sx={{textAlign: "center"}}>강의보기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lectures.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{row.lecture_name}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.begin_at).format("YYYY-MM-DD HH:mm:ss")}<br />{dayjs(row.end_at).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                  <TableCell align="center">{row.classroom}</TableCell>
                  
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => handleWatchLecture(row.id)}>
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

export default OnlineCourse;