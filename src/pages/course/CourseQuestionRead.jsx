import * as React from 'react';
import { useState } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

const mock = {
  id: 1,
  title: '테스트 제목',
  content: '<p>테스트 내용</p>',
  writer: '테스트 작성자',
  date: "2021-10-01 00:00",
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  textAlign: 'left',
  height: '270px',

}));


const CourseQuestionRead = () => {

  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate();


  const handleSubjectChange = (event) => setSubject(event.target.value)
  const handleContentChange = (value) => setContent(value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = () => {
    console.log(subject)
    console.log(title)
    console.log(content)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant='h1' component='h1' sx={{ pt: 3 }}>
          {mock.title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5' component='h5' sx={{ py: 3 }}>
            {mock.writer} | {mock.date}
          </Typography>
        </Box>
        <Box sx={{ minHeight: "400px", backgroundColor: "white", p: 2}}>
          <div
            dangerouslySetInnerHTML={{ __html: mock.content }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button variant="contained" sx={{ mt: 3, mb: 3 }} onClick={() => { navigate("/courseQuestion") }}>
            글 목록으로
          </Button>
          <Button variant="contained" sx={{ mt: 3, mb: 3, ml: 3 }} onClick={handleSubmit}>
            삭제하기
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default CourseQuestionRead;