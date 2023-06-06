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
import { Container } from '@mui/material';


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


const LearnTokTok = () => {

  const [currentSelectedLectureId, setCurrentSelectedLectureId] = useState('')

  const handleCurrentSelectedLectureIdChange = (id) => setCurrentSelectedLectureId(id);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "200px", height: "250px", boxShadow: 1, p: 0, m: 0, borderRadius: 3 }}>
        <Box sx={{ backgroundColor: "#424295", p: 1, color: "white" }} style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
          학습톡톡
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
          { currentSelectedLectureId == '' ? (<>
            {mock.map((item) => (
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
              {mock.filter((item) => item.id == currentSelectedLectureId).map((item) => (
                <>
                  {item.title}
                  <br/>
                  {item.professor}
                  <br/>
                </>
              ))}
            </>
          )}
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LearnTokTok;