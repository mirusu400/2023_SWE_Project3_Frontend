import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { post, get, postFile } from '../../utils'
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { MuiFileInput } from 'mui-file-input';

const mock = [{
  courseId: 1,
  name: "소프트웨어공학",
  semester: 3,
  credit: 3,
  type: "전공"
}]

const now = new Date();
const sevenDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

const LectureWrite = ({userData, selectedCourseId, setSelectedCourseId}) => {
  const [courses, setCourses] = useState(mock);
  const [classroom, setClassroom] = useState("");
  const [title, setTitle] = useState("");
  const [beginAt, setBeginAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = userData.userId;
    const beginTime = dayjs(beginAt).format("YYYY-MM-DDTHH:mm:ss");
    const endTime = dayjs(endAt).format("YYYY-MM-DDTHH:mm:ss");
    console.log(file)
    post("http://localhost:8080/api/lecture/add-lecture", {
      "course_id": selectedCourseId,
      "classroom": classroom,
      "lecture_name": title,
      "begin_at": beginTime,
      "end_at": endTime,  
    })
      .then((res) => {
        const lectureId = res.data.id;
        postFile("http://localhost:8080/api/lecture/add-video", lectureId, file)
          .then((res) => {
            console.log(res);
            alert("수업이 추가되었습니다.");
            navigate("/onlineCourse");
          })
          .catch((err) => {
            console.log(err);
            alert("수업 동영상 추가에 실패했습니다.");
            navigate("/onlineCourse");
          })

      })
      .catch((err) => {
        console.log(err);
        alert("수업 추가에 실패했습니다.");
      })
  }

  useEffect(() => {
    get("http://localhost:8080/api/lecture/user-list")
      .then((res) => {
        console.log(res.data.courseList)
        setCourses(res.data.courseList);
      })
      .catch((err) => {
        console.log(err);
        alert("강의 목록을 불러오는데 실패했습니다.")
      })
  }, [])

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleCourseChange = (event) => setSelectedCourseId(event.target.value)
  const handleClassroomChange = (event) => setClassroom(event.target.value)

  const handleStartDateChange = (date) => { 
    setBeginAt(date.$d)
  }
  const handleEndDateChange = (date) => { 
    setEndAt(date.$d)
  }

  const handleFileChange = (newFIle) => { setFile(newFIle) }


  return (
    <ThemeProvider theme={theme}>
      
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          수업 추가
        </Typography>
        <Box>
          <FormControl fullWidth sx={{  }}>
            <InputLabel htmlFor="course" id="course-select" filled>강의</InputLabel>
            <Select labelId="course-select" id="course" label="강의" defaultValue={selectedCourseId} onChange={ handleCourseChange }>
              {courses && courses.length > 0 && courses.map((course) => (
                <MenuItem key={course.course_id} value={course.course_id}>{course.name}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
          <TextField id="title" label="수업 명" fullWidth sx={{my: 3}} onChange = { handleTitleChange } />
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
            <TextField id="classroom" label="강의실 위치" onChange = { handleClassroomChange } sx={{ width: "50%", pr: 3}} />
            <MuiFileInput value={file} label="강의 동영상 파일" onChange={handleFileChange} sx={{ width: "50%", pl: 3}} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', flexDirection: "column", width: "100%", mr: 3}}>
                <Typography variant="span" component="span" sx={{my: 3, textAlign: "center"}}>시작일</Typography>
                <DateTimePicker defaultValue={dayjs(beginAt)} onChange={handleStartDateChange} sx={{width: "100%"}}></DateTimePicker>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "column", width: "100%", ml: 3}}>
                <Typography variant="span" component="span" sx={{my: 3, textAlign: "center"}}>종료일</Typography>
                <DateTimePicker defaultValue={dayjs(endAt)} onChange={handleEndDateChange}></DateTimePicker>
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
      </Container>
      <Button variant="contained" sx={{mt: 3, mb: 3, ml: 3, width: "100%"}} onClick = { handleSubmit }>
        수업 추가
      </Button>
    </ThemeProvider>
  )
};

export default LectureWrite;