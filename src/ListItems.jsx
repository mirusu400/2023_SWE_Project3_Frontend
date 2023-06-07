import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import CameraIcon from '@mui/icons-material/Camera';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListSubheader component="div" inset sx={{ pl: "72px"}}>
        강의종합정보
      </ListSubheader>
      <ListItemButton onClick={() => navigate('/')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="학습지원실" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/onlineLecture')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <CameraIcon />
        </ListItemIcon>
        <ListItemText primary="온라인강의" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/addLecture')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="수강신청" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/lectureQuestion')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="강의질문" />
      </ListItemButton>
      <ListSubheader component="div" inset sx={{ pl: "72px"}}>
        공학교육
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon sx={{ pl: "5px"}}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="학생 상담" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ pl: "5px"}}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="학습성과 평가" />
      </ListItemButton>
      <ListItemButton onClick={() => { navigate("/lectureRecord")}}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="성적 확인" />
      </ListItemButton>
    </React.Fragment>
  )
};

export default MainListItems;