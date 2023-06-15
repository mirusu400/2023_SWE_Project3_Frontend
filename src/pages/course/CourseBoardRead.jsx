// 공지 읽기 페이지

import * as React from 'react';
import { useState } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container, Grid, Box, Paper, Typography, Table, TableBody, Divider,
  TableCell, TableContainer, TableHead, TableRow, Button, FormControl, InputLabel, Select, MenuItem, TextField
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { get, post, del } from '../../utils';
import dayjs, { Dayjs } from 'dayjs';

const mock = {
  id: 1,
  board_id: 1,
  user_id: 1,
  name: '테스트 제목',
  content: '<p>테스트 내용</p>',
  type: '공지사항',
  date: "2021-10-01 00:00",
}


const CourseBoardRead = () => {

  const [data, setData] = useState(mock)

  const navigate = useNavigate();

  const handleRemove = () => {
    const articleId = new URLSearchParams(window.location.search).get("id");
    del(`http://localhost:8080/api/article/delete/${articleId}`, {
    })
      .then((response) => {
        alert("삭제되었습니다.")
        navigate(-1);
      })
  }

  const handleEdit = () => {
    const articleId = new URLSearchParams(window.location.search).get("id");
    navigate(`/courseEdit?id=${articleId}`)
  }

  useEffect(() => {
    const articleId = new URLSearchParams(window.location.search).get("id");
    post("http://localhost:8080/api/article/get", {
      article_id: articleId
    })
      .then((response) => {
        setData(response.data)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant='h1' component='h1' sx={{ pt: 3 }}>
          {data.name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5' component='h5' sx={{ py: 3 }}>
            {data.user_name} | {dayjs(data.created_at).format("YYYY-MM-DD HH:mm:ss")} | {data.type}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ minHeight: "400px", backgroundColor: "white", p: 2}}>
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button variant="contained" sx={{ mt: 3, mb: 3 }} onClick={() => { navigate(-1) }}>
            글 목록으로
          </Button>
          <Button variant="contained" sx={{ mt: 3, mb: 3, ml: 3 }} onClick={() => {handleRemove()}}>
            삭제하기
          </Button>
          <Button variant="contained" sx={{ mt: 3, mb: 3, ml: 3 }} onClick={() => {handleEdit()}} >
            수정하기
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default CourseBoardRead;