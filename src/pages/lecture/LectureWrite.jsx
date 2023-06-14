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

const CourseWrite = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [credit, setCredit] = useState(1)
  const [semester, setSemester] = useState(1)
  const [subject, setSubject] = useState()

  const navigate = useNavigate();

  const handleContentChange = (value) => setContent(value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = async () => {
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
      title: title,
      content: content,
      credit: credit,
      semester: semester,
      subject: subject,
      lecturer_id: userId
    })
      .then((res) => {
        alert("강의가 추가되었습니다.");
        navigate('/addCourse');
      })
      .error((err) => {
        alert("강의 추가에 실패했습니다.")
      })
  }
  const handleCreditChange = (event) => setCredit(event.target.value)
  const handleSemesterChange = (event) => setSemester(event.target.value)
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
          <Typography variant='span' sx={{ mb: 3 }}>
            강의 설명(계획)
          </Typography>
          <CKEditor
            editor={ ClassicEditor }
            data=""
            onChange={( event, editor ) => { 
              handleContentChange(editor.getData());
            }}
          />
        </Box>
      </Container>
      <Button variant="contained" sx={{mt: 3, mb: 3, ml: 3}} onClick = { handleSubmit }>
        강의 추가
      </Button>
    </ThemeProvider>
  )
};

export default CourseWrite;