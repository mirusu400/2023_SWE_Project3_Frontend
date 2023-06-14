// 수강신청 페이지
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Button, Modal
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CourseDetail from './components/CourseDetail'
import theme from '../theme';
import { post, get } from '../utils'
import { useNavigate } from 'react-router-dom';

const mock = [{
  courseId: 1,
  name: "소프트웨어공학",
  semester: 3,
  credit: 3,
  type: "전공"
}]



const AddCourse = () => {

  const navigate = useNavigate();
  const [courses, setCourses] = useState(mock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); }
  const [selectedCourseId, setSelectedCourseId] = useState(1)

  const handleWriteLecture = () => { navigate("/courseWrite") }
  const handleAddLecture = async (row) => {
    console.log(row);
    post("http://localhost:8080/api/lecture/apply", {
      lectureId: row.course_id  
    })
      .then((res) => {
        alert("수강신청이 완료되었습니다.")
        navigate('/onlineCourse');
      })
      .catch((err) => {
        console.log(err);
        alert("수강신청에 실패했습니다.")
      })
  }

  useEffect(() => {
    get("http://localhost:8080/api/lecture/list")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
        setCourses([]);
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant='h1' component='h1' sx={{py: 3}}>
          수강 신청
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{textAlign: "center", width: "30%"}}>과목명</TableCell>
                <TableCell sx={{textAlign: "center"}}>학년</TableCell>

                <TableCell sx={{textAlign: "center"}}>학점</TableCell>
                <TableCell sx={{textAlign: "center"}}>강의종류</TableCell>
                <TableCell sx={{textAlign: "center"}}>강의계획서</TableCell>
                <TableCell sx={{textAlign: "center"}}>수강신청</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.semester}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" href="" onClick={() => { 
                      setSelectedCourseId(row.course_id);
                      handleOpen();
                    }}>
                      강의계획서 조회
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" href="" onClick={() => {handleAddLecture(row)}}>
                      강의 수강하기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" sx={{ my: 3}} onClick={() => {handleWriteLecture();}}>
          강의 추가
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CourseDetail courseId={selectedCourseId} />
        </Modal>
      </Container>
    </ThemeProvider>
  )
};

export default AddCourse;