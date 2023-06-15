import * as React from 'react';
import { useState } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField, Divider
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { get } from '../utils';

const mock = {
  username: "테스트",
  id: 1,
  semester: "2021년 2학기",
  courses: [
    { idx: "1", title: '소프트웨어공학', start: '2023-04-27 00:00', end: '2023-05-01 00:00', progress: '10%', point: "3", record: "A+" },
    { idx: "2", title: '컴퓨터구조', start: '2023-04-27 00:00', end: '2023-05-01 00:00', progress: '10%', point: "3", record: "A+" },
  ],
  courseOverall: {
    majorCredit: 34,
    refineCredit: 15,
  }
}

const CourseRecord = ({userData}) => {
  const [data, setData] = useState(userData);
  const [courses, setCourses] = useState();
  const [totalCredit, setTotalCredit] = useState(0);
  const [courseHistory, setCourseHistory] = useState([]);
  useEffect(() => {
    get("http://localhost:8080/api/lecture/user-list")
      .then((response) => {
        setCourses(response.data.courseList);
        setTotalCredit(response.data.totalCredit);
      });

    (async () => {
      const tmpCourseHistory = []
      for (let i = 1; i < 9; i++) {
        const courseHistoryResponse = await get(`http://localhost:8080/api/lecture/get-grade/${i}`);
        tmpCourseHistory.push(courseHistoryResponse.data);
      }
      console.log("tmpCourseHistory")
      console.log(tmpCourseHistory)
      setCourseHistory(tmpCourseHistory);
    })();
  }, [])

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant='h1' component='h1' sx={{ pt: 3 }}>
          수강/성적조회
        </Typography>
        
        <Typography variant='h4' component='h4' sx={{ pt: 3 }}>
          기본정보
        </Typography>
        
        <Divider sx={{ my: 1 }} />
        {/* 기본 정보 */}
        <TableContainer component={Paper} sx={{ width: '100%', mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>구분</TableCell>
                <TableCell sx={{ textAlign: "center" }}>학번</TableCell>
                <TableCell sx={{ textAlign: "center" }}>이름</TableCell>
                <TableCell sx={{ textAlign: "center" }}>학기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ textAlign: "center"}}>학부</TableCell>
                <TableCell sx={{ textAlign: "center"}}>{data.userId}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>{data.username}</TableCell>
                <TableCell sx={{ textAlign: "center"}}>3</TableCell>
                
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h4' component='h4' sx={{ pt: 3 }}>
          학점정보
        </Typography>
        <Divider sx={{ my: 1 }} />
        {/* 학점 정보 */}
        <TableContainer component={Paper} sx={{ width: '100%', mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>전공학점</TableCell>
                <TableCell sx={{ textAlign: "center" }}>교양학점</TableCell>
                <TableCell sx={{ textAlign: "center" }}>전체학점</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">35</TableCell>
                <TableCell align="center">17</TableCell>
                <TableCell align="center">52</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


        <Typography variant='h4' component='h4' sx={{ pt: 3 }}>
          수강과목
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="span" component="span">
          총 학점: {totalCredit}
        </Typography>
        {/* 수강 과목 */}
        <TableContainer component={Paper} sx={{ width: '100%', mt: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>과목명</TableCell>
                <TableCell sx={{ textAlign: "center" }}>학기</TableCell>
                <TableCell sx={{ textAlign: "center" }}>학점</TableCell>
                <TableCell sx={{ textAlign: "center" }}>종류</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses && courses.length > 0 && courses.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.semester}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant='h4' component='h4' sx={{ pt: 3 }}>
          학기이력
        </Typography>
        <Divider sx={{ my: 1 }} />
        {/* 학기 이력 */}
        {courseHistory && courseHistory.length > 0 && courseHistory.map((row, idx) => (
          <>
            <Typography variant="h5" component="h5" sx={{ py: 2, fontSize: 20}}>
              {idx + 1} 학기
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "center", width: "33%" }}>과목명</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>학기</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>학점</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>총점</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row && row.length > 0 && row.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell align="center">{item.course.name}</TableCell>
                      <TableCell align="center">{item.semester}</TableCell>
                      <TableCell align="center">{item.grade > 90 ? "A" : item.grade > 80 ? "B" : item.grade > 70 ? "C" : item.grade > 60 ? "D" : "F"}</TableCell>
                      <TableCell align="center">{item.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>

        ))}
      </Container>
    </ThemeProvider>
  )
};

export default CourseRecord;