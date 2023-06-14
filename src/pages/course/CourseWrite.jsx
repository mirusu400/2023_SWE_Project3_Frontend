import * as React from 'react';
import { useState } from 'react';

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
import { post, get } from '../../utils'
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const now = new Date();
const sevenDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
const CourseWrite = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [credit, setCredit] = useState(1)
  const [semester, setSemester] = useState(1)
  const [type, setType] = useState("교양")
  const [classroom, setClassroom] = useState("새빛관 101호")
  const [beginAt, setBeginAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()));


  const navigate = useNavigate();

  const handleContentChange = (value) => setContent(value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = async () => {
    const beginTime = dayjs(beginAt).format('YYYY-MM-DDTHH:mm:ss');
    const endTime = dayjs(endAt).format('YYYY-MM-DDTHH:mm:ss');
    let userId = 1;
    try {
      const result = await get("http://localhost:8080/api/user");
      console.log(result);
      userId = result.data.userId;
    } catch {
      alert("로그인이 필요합니다.");
      return;
    }
    post("http://localhost:8080/api/lecture/add-course", {
      name: title,
      credit: credit,
      semester: semester,
      type: type,
      lecturer_id: userId
    })
      .then((res) => {
        const courseId = res.data.course_id;
        post("http://localhost:8080/api/lecture/add-course-detail", {
          course_id: courseId,
          classroom: classroom,
          begin_at: beginTime,
          end_at: endTime
        })
          .then((res) => {
            alert("강의가 추가되었습니다.");
            navigate('/addCourse');
          })
          .catch((err) => {
            alert("강의 추가에 실패했습니다.")
          })
      })
      .error((err) => {
        alert("강의 추가에 실패했습니다.")
      })
  }
  const handleCreditChange = (event) => setCredit(event.target.value)
  const handleSemesterChange = (event) => setSemester(event.target.value)
  const handleTypeChange = (event) => setType(event.target.value)
  const handleClassroomChange = (event) => setClassroom(event.target.value)
  const handleStartDateChange = (date) => { setBeginAt(date.$d) }
  const handleEndDateChange = (date) => { setEndAt(date.$d) }
  return (
    <ThemeProvider theme={theme}>
      
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          강의 추가
        </Typography>
        <Box>
          <TextField id="title" label="강의명" fullWidth sx={{my: 3}} onChange = { handleTitleChange } />
          <Box sx={{ mb: 3, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <FormControl fullWidth sx={{ mb: 3, mr: 2 }}>
              <InputLabel htmlFor="credit" filled>학점</InputLabel>
              <Select labelId="credit" id="credit" label="학점" onChange={ handleCreditChange }>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, ml: 2 }}>
              <InputLabel htmlFor="subject" filled>학년</InputLabel>
              <Select labelId="subject" id="subject" label="학년" onChange={ handleSemesterChange }>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth sx={{ mb: 3, mr: 2 }}>
            <InputLabel htmlFor="credit" filled>타입</InputLabel>
            <Select labelId="type" id="credit" label="타입" onChange={ handleTypeChange }>
              <MenuItem value={"교양"}>교양</MenuItem>
              <MenuItem value={"기초"}>기초</MenuItem>
              <MenuItem value={"전필"}>전필</MenuItem>
              <MenuItem value={"전선"}>전선</MenuItem>
            </Select>
          </FormControl>
          <TextField id="classroom" label="강의실" fullWidth sx={{my: 3}} onChange = { handleTitleChange } />
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
      <Button variant="contained" sx={{mt: 3, mb: 3, ml: 3}} onClick = { handleSubmit }>
        강의 추가
      </Button>
    </ThemeProvider>
  )
};

export default CourseWrite;