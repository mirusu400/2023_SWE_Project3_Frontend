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
import { get, post } from '../utils';

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

const CourseGrade = ({userData}) => {
  const [data, setData] = useState(userData);
  const [grade, setGrade] = useState();
  const [score, setScore] = useState();
  const [courseList, setCourseList] = useState(CourseList);
  const [users, setUsers] = useState([]);
  const [availableCourseList, setAvailableCourseList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(undefined);
  const [selectedCourseId, setSelectedCourseId] = useState(undefined);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  }
  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  }
  const handleSubmit = () => {
    const selectedCourse = availableCourseList.find((item) => item.course_id === selectedCourseId);
    post("http://localhost:8080/api/lecture/grade", {
      course_id: selectedCourseId,
      user_id: selectedUserId,
      semester: selectedCourse.semester,
      grade: grade,
      score: score
    }).then((res) => {
      alert("성적이 입력되었습니다.")
      setGrade(undefined)
      setScore(undefined)
    })
  }

  useEffect(() => {
    get("http://localhost:8080/api/lecture/course-list")
      .then((res) => {
        console.log(res.data);
        setCourseList(res.data);
      })
    get("http://localhost:8080/api/user/list")
      .then((res) => {
        setUsers(res.data);
      })
  }, [])

  useEffect(() => {
    const selectedUser = users.find((item) => item.userId === selectedUserId);
    if (!selectedUser) return;
    console.log(courseList.filter((item) => selectedUser.lectureList.includes(item.course_id)));
    setAvailableCourseList(courseList.filter((item) => selectedUser.lectureList.includes(item.course_id)))
  }, [selectedUserId])

  const handleSemester = (event) => { setSemester(event.target.value); };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant='h1' component='h1' sx={{ pt: 3 }}>
          성적 입력
        </Typography>
        
        <Typography variant='h4' component='h4' sx={{ pt: 3 }}>
          기본정보
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="user" filled>사용자</InputLabel>
            <Select key="user" labelId="user" id="user" label="사용자" onChange={handleUserChange}>
              {users && users.length > 0 && users.map((item) => (
                <MenuItem value={item.userId} key={item.userId}>[{item.username}] {item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="subject" filled>과목</InputLabel>
            <Select key="subject" labelId="subject" id="subject" label="과목" onChange={handleCourseChange}>
              {availableCourseList && availableCourseList.length > 0 && availableCourseList.map((item) => (
                <MenuItem value={item.course_id} key={item.course_id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%" }}>
            <TextField id="grade" label="학점" variant="outlined" sx={{ m: 1, minWidth: 120, width: "50%" }} value={grade} onChange={(e) => {setGrade(e.target.value)}} />
            <TextField id="score" label="성적" variant="outlined" sx={{ m: 1, minWidth: 120, width: "50%" }} value={score} onChange={(e) => {setScore(e.target.value)}} />
          </Box>
          <Button variant="contained" sx={{ m: 1, minWidth: 120 }} onClick={() => {handleSubmit()}}>입력</Button>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
};

export default CourseGrade;