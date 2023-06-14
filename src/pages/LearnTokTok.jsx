/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import theme from '../theme';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextareaAutosize } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEffect } from 'react';
import { post, get } from '../utils';
const mock = [{
  lectureId: 1,
  name: "소프트웨어공학",
  semester: 3,
  credit: 3,
  type: "전공"
}]

const mock2 = [{
  id: 1,
  content: "테스트 채팅 1"
}, {
  id: 2,
  content: "테스트 채팅 2"
}, {
  id: 3,
  content: "테스트 채팅 3"  
}, {
  id: 4,
  content: "테스트 채팅 3"  
}, {
  id: 5,
  content: "테스트 채팅 3"  
}, {
  id: 6,
  content: "테스트 채팅 3"  
}]



const LearnTokTok = ({userData}) => {
  const [courseData, setCourseData] = useState(mock);
  const [currentSelectedcourseId, setCurrentSelectedcourseId] = useState('')
  const [currentChat, setCurrentChat] = useState(mock2)
  const [chat, setChat] = useState('')

  useEffect(() => {
    get('http://localhost:8080/api/lecture/user-list')
      .then((response) => { 
        console.log(response.data)
        setCourseData(response.data.lectureInfoList) })
      .catch((error) => { alert("데이터를 가져오는데 실패했습니다.") })
  }, [])

  useEffect(() => {
    if (currentSelectedcourseId === '') return;
    post('http://localhost:8080/api/talk/list', {
      "course_id": currentSelectedcourseId,
      "lecturer_id": userData.userId
    })
      .then((response) => {
        console.log(response.data)
        setCurrentChat(response.data)
      })
      // .catch((error) => { alert("데이터를 가져오는데 실패했습니다.") })
  }, [currentSelectedcourseId])

  useEffect(() => { setTimeout(scrolldownChat, 5)}, [currentChat])

  const scrolldownChat = () => {
    // Scroll down chat-box to bottom
    const chatBox = document.getElementById('chat-box')
    chatBox.scrollTop = chatBox.scrollHeight
  }

  const handleTextFieldSubmit = (e) => {
    if (e.keyCode === 13) {
      post("http://localhost:8080/api/talk/create", {
        "course_id": currentSelectedcourseId,
        "content": e.target.value
      })
        .then((response) => {
          console.log(response.data)
          setCurrentChat([...currentChat, response.data])
          setChat('')
        })
    }
  };

  const handleChat = (e) => { setChat(e.target.value) }


  const handleCurrentSelectedcourseIdChange = (id) => setCurrentSelectedcourseId(id);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: "200px", height: "250px", p: 0, m: 0, borderRadius: 3, backgroundColor: "white" }}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}
      >
        <Box sx={{ backgroundColor: "#424295", p: 1, color: "white", cursor: "pointer", display: "flex", flexDirection: "row" }} style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>

          <Box sx={{ cursor: "pointer", width: '24px' }} onClick = {() => {handleCurrentSelectedcourseIdChange('')}}>
            {currentSelectedcourseId != '' ? <><ChevronLeftIcon sx={{ fontSize: 12 }} /> &nbsp;</> : <></>}
          </Box>
          학습톡톡
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1, height: "100%" }}>
          { currentSelectedcourseId == '' ? (<>
          {/* 강의 목록 */}
            {courseData.length > 0 ? (courseData.map((item) => (
              <Box key={item.course_id} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", py: 0.5, cursor: "pointer" }}
                onClick = {() => {handleCurrentSelectedcourseIdChange(item.course_id)}}
              >
                <Typography sx={{ fontSize: 12 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {item.type}
                </Typography>
              </Box>
            ))) : (
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", py: 0.5 }}>
                <Typography sx={{ fontSize: 12 }}>
                  수강중인 강의가 없습니다.
                </Typography>
              </Box>
            )}
          </>
          ) : (
            <>
              {courseData.filter((item) => item.course_id == currentSelectedcourseId).map((item) => (
                <Box key={item.id} sx={{ height: "100%"}}>
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", py: 0.5, cursor: "pointer" }} onClick = {() => {handleCurrentSelectedcourseIdChange('')}}>
                    <Typography sx={{ fontSize: 12 }}>
                    {item.title} &nbsp; {item.professor}
                    </Typography>
                  </Box>
                  <Box id="chat-box" sx={{ display: "flex", flexDirection: "column", alignItems: "left", py: 0.5, height: "130px", overflow: "auto" }}>
                    {currentChat.map((item, idx) => (
                      <Box key={idx} sx={{
                        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        borderRadius: 2, boxShadow: 1, backgroundColor: "#424295", height: "24px", my: 0.3, px: 1, minHeight: "24px"
                      }}>
                        <Typography sx={{ fontSize: 12, color: "white" }}>
                          {item.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: "block", bottom: 0 }}>
                    <TextField variant="standard" onKeyDown={handleTextFieldSubmit} value={chat} onChange={handleChat}></TextField>
                  </Box>
                </Box>
              ))}
            </>
          )}
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LearnTokTok;