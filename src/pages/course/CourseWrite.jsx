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
import { DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const CourseWrite = ({userData}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [credit, setCredit] = useState(1)
  const [semester, setSemester] = useState(1)
  const [type, setType] = useState("교양")
  const [classroom, setClassroom] = useState("새빛관 101호")
  const [week1, setWeek1] = useState("월")
  const [week2, setWeek2] = useState("월")
  const [beginAt1, setBeginAt1] = useState(new Date());
  const [endAt1, setEndAt1] = useState(new Date());
  const [beginAt2, setBeginAt2] = useState(new Date());
  const [endAt2, setEndAt2] = useState(new Date());

  const navigate = useNavigate();

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = async () => {
    const beginTime1 = dayjs(beginAt1).format('HH:mm:ss');
    const endTime1 = dayjs(endAt1).format('HH:mm:ss');
    const beginTime2 = dayjs(beginAt2).format('HH:mm:ss');
    const endTime2 = dayjs(endAt2).format('HH:mm:ss');

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
      .then(async (res) => {
        const courseId = res.data.course_id;
        try {
          await post("http://localhost:8080/api/lecture/add-course-detail", {
            course_id: courseId,
            classroom: classroom,
            day_of_week: week1,
            begin_at: beginTime1,
            end_at: endTime1
          })
          await post("http://localhost:8080/api/lecture/add-course-detail", {
            course_id: courseId,
            classroom: classroom,
            day_of_week: week2,
            begin_at: beginTime2,
            end_at: endTime2
          })
          alert("강의가 추가되었습니다.");
          navigate('/addCourse');
        }
        catch {
          alert("강의 추가에 실패했습니다.")
        }
      })
      .catch((err) => {
        alert("강의 추가에 실패했습니다.")
      })
  }
  const handleCreditChange = (event) => setCredit(event.target.value)
  const handleSemesterChange = (event) => setSemester(event.target.value)
  const handleTypeChange = (event) => setType(event.target.value)
  const handleClassroomChange = (event) => setClassroom(event.target.value)


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
              <InputLabel htmlFor="subject" filled>학기</InputLabel>
              <Select labelId="subject" id="subject" label="학기" onChange={ handleSemesterChange }>
                <MenuItem value={1}>1학기</MenuItem>
                <MenuItem value={2}>2학기</MenuItem>
                <MenuItem value={3}>3학기</MenuItem>
                <MenuItem value={4}>4학기</MenuItem>
                <MenuItem value={5}>5학기</MenuItem>
                <MenuItem value={6}>6학기</MenuItem>
                <MenuItem value={7}>7학기</MenuItem>
                <MenuItem value={8}>8학기</MenuItem>
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
          <TextField id="classroom" label="강의실" fullWidth sx={{my: 3}} onChange = { handleClassroomChange } />
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
            <FormControl sx={{ mb: 3, mr: 2, width: "15%" }}>
              <InputLabel htmlFor="week1" filled>요일</InputLabel>
              <Select labelId="week1" id="week1" label="요일" onChange={ (event) => { setWeek1(event.target.value) } }>
                <MenuItem value={"월"}>월</MenuItem>
                <MenuItem value={"화"}>화</MenuItem>
                <MenuItem value={"수"}>수</MenuItem>
                <MenuItem value={"목"}>목</MenuItem>
                <MenuItem value={"금"}>금</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="span" component="span" sx={{my: 1.7, textAlign: "center"}}>시작시간</Typography>
              <TimePicker onChange={(date) => {setBeginAt1(date.$d)}} ></TimePicker>
              <Typography variant="span" component="span" sx={{my: 1.7, textAlign: "center"}}>종료시간</Typography>
              <TimePicker onChange={(date) => {setEndAt1(date.$d)}}></TimePicker>
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
            <FormControl sx={{ mb: 3, mr: 2, width: "15%" }}>
              <InputLabel htmlFor="week2" filled>요일</InputLabel>
              <Select labelId="week2" id="week2" label="요일" onChange={ (event) => { setWeek2(event.target.value) } }>
                <MenuItem value={"월"}>월</MenuItem>
                <MenuItem value={"화"}>화</MenuItem>
                <MenuItem value={"수"}>수</MenuItem>
                <MenuItem value={"목"}>목</MenuItem>
                <MenuItem value={"금"}>금</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="span" component="span" sx={{my: 1.7, textAlign: "center"}}>시작시간</Typography>
              <TimePicker onChange={(date) => {setBeginAt2(date.$d)}} ></TimePicker>
              <Typography variant="span" component="span" sx={{my: 1.7, textAlign: "center"}}>종료시간</Typography>
              <TimePicker onChange={(date) => {setEndAt2(date.$d)}}></TimePicker>
            </LocalizationProvider>
          </Box>
          
        </Box>
      </Container>
      <Button variant="contained" sx={{mt: 3, mb: 3, ml: 3}} fullWidth onClick = { handleSubmit }>
        강의 추가
      </Button>
    </ThemeProvider>
  )
};

export default CourseWrite;