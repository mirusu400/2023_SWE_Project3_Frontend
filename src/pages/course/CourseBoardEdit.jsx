import * as React from 'react';
import { useState, useEffect } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField, Divider
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { get, post, put } from "../../utils"
import { useNavigate } from 'react-router-dom';
import { MuiFileInput } from 'mui-file-input';


const CourseBoardEdit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [boardId, setBoardId] = useState('')
  const [userId, setUserId] = useState('')
  const [boardType, setBoardType] = useState('')
  const [file, setFile] = useState(null);

  const handleContentChange = (value) => setContent(value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleSubmit = () => {
    const articleId = new URLSearchParams(window.location.search).get('id');
    put("http://localhost:8080/api/article/update", {
      id: articleId,
      board_id: boardId,
      user_id: userId,
      name: title,
      content: content,
      type: boardType

    })
      .then(() => {
        alert("성공적으로 수정되었습니다.")
        navigate(-1);
      })
  }
  const handleFileChange = (newFile) => { setFile(newFile) }

  useEffect(() => {
    const articleId = new URLSearchParams(window.location.search).get("id");
    post("http://localhost:8080/api/article/get", {
      article_id: articleId
    })
      .then((response) => {
        setContent(response.data.content)
        setTitle(response.data.name);
        setBoardId(response.data.board_id);
        setUserId(response.data.user_id);
        setBoardType(response.data.type);
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          게시물 수정
        </Typography>
        <Box>
          <TextField id="title" label="제목" fullWidth sx={{my: 3}} onChange = { handleTitleChange } value={title} />
          <CKEditor
            editor={ ClassicEditor }
            data={content}
            onChange={( event, editor ) => { 
              handleContentChange(editor.getData());
            }}
          />
        </Box>
        <Divider sx={{my: 2}}/>
        { boardType == "자료실" || boardType == "과제" ?
          <>
            <Typography variant='h4' component='h4' sx={{py: 1}}>
              첨부파일 수정
            </Typography>
            <Box sx={{ pt: 3}}>
              <MuiFileInput value={file} sx={{width: "100%"}} label="파일 첨부" onChange={handleFileChange} />
            </Box>
          </>
          : null
        }
        
      </Container>
      <Button variant="contained" sx={{mt: 3, mb: 3, ml: 3}} onClick = { handleSubmit }>
        게시물 수정
      </Button>
    </ThemeProvider>
  )
};

export default CourseBoardEdit;