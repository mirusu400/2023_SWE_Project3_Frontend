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
import { get, post, postBoard } from "../../utils"
import { MuiFileInput } from 'mui-file-input';
import { useNavigate } from 'react-router-dom';

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


const CourseHomeworkReplyWrite = ({userData, selectedCourseId, setSelectedCourseId}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [courseList, setCourseList] = useState(CourseList)
  const [file, setFile] = useState(null)
  const [parentArticleData, setParentArticleData] = useState(null)

  const handleContentChange = (value) => setContent(value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = () => {
    const parentArticleId = new URLSearchParams(window.location.search).get("articleId")
    postBoard("http://localhost:8080/api/article/add", {
      board_id: selectedCourseId,
      user_id: userData.userId,
      name: title,
      content: content,
      parent_article_id: parentArticleId,
      type: "과제"
    }, file)
      .then(() => {
        alert("성공적으로 등록되었습니다.")
        navigate("/courseHomework")
      })
  }
  const handleFileChange = (newFile) => { setFile(newFile) }

  useEffect(() => {
    post("http://localhost:8080/api/article/get", {
      article_id: new URLSearchParams(window.location.search).get("articleId")
    })
      .then((response) => {
        setParentArticleData(response.data)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          {parentArticleData && parentArticleData.name} 과제 제출
        </Typography>
        <Box>
          <TextField id="title" label="제목" fullWidth sx={{my: 3}} onChange = { handleTitleChange } />
          <CKEditor
            editor={ ClassicEditor }
            data={content}
            onChange={( event, editor ) => { 
              handleContentChange(editor.getData());
            }}
          />
        </Box>
        <Box sx={{ pt: 3 }}>
          <MuiFileInput value={file} sx={{width: "100%"}} label="파일 첨부" onChange={handleFileChange} />
        </Box>
      </Container>
      <Button variant="contained" sx={{mt: 3, mb: 3, ml: 3}} onClick = { handleSubmit }>
        과제 제출
      </Button>
    </ThemeProvider>
  )
};

export default CourseHomeworkReplyWrite;