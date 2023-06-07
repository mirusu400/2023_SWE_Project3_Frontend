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
import Textarea from '@mui/joy/Textarea';
const mock = [{
  id: 1,
  title: '소프트웨어공학',
  professor: '교수1',
}, {
  id: 2,
  title: '컴퓨터구조',
  professor: '교수2',
}, {
  id: 3,
  title: '컴퓨터네트워크',
  professor: '교수3',
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
}]



const LearnTokTok = () => {
  const [lectureData, setLectureData] = useState(mock);
  const [currentSelectedLectureId, setCurrentSelectedLectureId] = useState('')
  const [currentChat, setCurrentChat] = useState(mock2)

  const handleCurrentSelectedLectureIdChange = (id) => setCurrentSelectedLectureId(id);
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

          <Box sx={{ cursor: "pointer", width: '24px' }} onClick = {() => {handleCurrentSelectedLectureIdChange('')}}>
            {currentSelectedLectureId != '' ? <><ChevronLeftIcon sx={{ fontSize: 12 }} /> &nbsp;</> : <></>}
          </Box>
          학습톡톡
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          { currentSelectedLectureId == '' ? (<>
            {lectureData.map((item) => (
              <Box key={item.id} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", py: 0.5, cursor: "pointer" }} onClick = {() => {handleCurrentSelectedLectureIdChange(item.id)}}>
                <Typography sx={{ fontSize: 12 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {item.professor}
                </Typography>
              </Box>
            ))}
          </>
          ) : (
            <>
              {lectureData.filter((item) => item.id == currentSelectedLectureId).map((item) => (
                <Box>
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", py: 0.5, cursor: "pointer" }} onClick = {() => {handleCurrentSelectedLectureIdChange('')}}>
                    <Typography sx={{ fontSize: 12 }}>
                    {item.title} &nbsp; {item.professor}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "left", py: 0.5 }}>
                    {currentChat.map((item) => (
                      <Box sx={{
                        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                        borderRadius: 2, boxShadow: 1, backgroundColor: "#424295", height: "24px", my: 0.3, px: 1, minHeight: "24px"
                      }}>
                        <Typography sx={{ fontSize: 12, color: "white" }}>
                          {item.content}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Textarea />
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