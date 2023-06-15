import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField, Divider
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { post, get } from '../../utils'
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const mock = [
  {
    "course_id": 1,
    "lecturer_id": 1,
    "name": "test2",
    "description": null,
    "semester": 4,
    "credit": 2,
    "type": "전선"
  },
  [],
  [
    {
      "id": 1,
      "course_id": 1,
      "name": "test2: 공지"
    },
    {
      "id": 2,
      "course_id": 1,
      "name": "test2: 강의자료"
    },
    {
      "id": 3,
      "course_id": 1,
      "name": "test2: 과제"
    },
    {
      "id": 4,
      "course_id": 1,
      "name": "test2: 질문"
    }
  ],
  [
    []
  ]
]

const CourseDetail = ({ courseId }) => {

  const [data, setData] = useState(mock)
  const [timeData, setTimeData] = useState([])

  useEffect(() => {
    get(`http://localhost:8080/api/lecture/get-course?id=${courseId}`)
      .then((res) => {
        setData(res.data);
        setTimeData(res.data[1])
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={style}>
          <Typography variant='h1' component='h1' sx={{pb: 3}}>
            강의 계획서
          </Typography>
          {/* TODO: 구체적인 강의 계획서 추가 */}
          <Typography variant='h5' component='h5' sx={{pb: 3}}>
            강의 정보
          </Typography>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>교과목명</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{data[0].name}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>과목번호</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{data[0].semester}-{data[0].course_id}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>학점</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{data[0].credit}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>이수구분</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{data[0].type}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant='h5' component='h5' sx={{pt: 3, pb: 3}}>
            수업 시간
          </Typography>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>요일</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>강의실</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>시작 시간</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>종료 시간</TableCell>
                </TableRow>
              </TableBody>
              {timeData && timeData.length > 0 && timeData.map((time, index) => {
                console.log(time)
                return (
                <TableBody key={index}>
                  <TableCell sx={{ textAlign: "center" }}>{time.day_of_week}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{time.classroom}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{time.begin_at}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{time.end_at}</TableCell>
                </TableBody>
)})}
            </Table>
          </TableContainer>
              
          
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default CourseDetail;