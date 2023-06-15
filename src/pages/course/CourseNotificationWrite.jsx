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
import { get, post } from "../../utils"

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


const CourseNotificationWrite = ({selectedCourseId, setSelectedCourseId}) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [courseList, setCourseList] = useState(CourseList)

  const handleContentChange = (value) => setContent(value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = () => {
    console.log(selectedCourseId)
    console.log(title)
    console.log(content)
  }
  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
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
          강의 질문 작성
        </Typography>
        <Box>
          <FormControl fullWidth>
            <InputLabel htmlFor="subject">과목</InputLabel>
            <Select labelId="subject" id="subject" label="과목" onChange={handleCourseChange} defaultValue={selectedCourseId}>
              {courseList.map((item) => (
                <MenuItem value={item.course_id} key={item.course_id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField id="title" label="제목" fullWidth sx={{my: 3}} onChange = { handleTitleChange } />
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
        글 쓰기
      </Button>
    </ThemeProvider>
  )
};

export default CourseNotificationWrite;