import * as React from 'react';
import { useState } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const mock = [{
  id: 1,
  title: '소프트웨어공학',
}, {
  id: 2,
  title: '컴퓨터구조',
}, {
  id: 3,
  title: '컴퓨터네트워크',
}]

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


const LectureQuestion = () => {

  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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
      
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          강의 질문
        </Typography>
        <Box>
          <FormControl fullWidth>
            <InputLabel htmlFor="subject">과목</InputLabel>
            <Select labelId="subject" id="subject" label="과목" onChange={handleSubjectChange}>
              {mock.map((item) => (
                <MenuItem value={item.id} key={item.id}>{item.title}</MenuItem>
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

export default LectureQuestion;