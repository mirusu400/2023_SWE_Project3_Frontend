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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import HelpIcon from '@mui/icons-material/Help';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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
      <ListItemButton onClick={() => navigate('/onlineCourse')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <CameraIcon />
        </ListItemIcon>
        <ListItemText primary="온라인강의" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/courseHomework')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="과제제출" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/courseNotification')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <PriorityHighIcon />
        </ListItemIcon>
        <ListItemText primary="공지사항" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/courseQuestion')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="강의질문" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate('/courseArchive')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <DriveFileMoveIcon />
        </ListItemIcon>
        <ListItemText primary="강의자료실" />
      </ListItemButton>
      
      <ListSubheader component="div" inset sx={{ pl: "72px"}}>
        수강관리
      </ListSubheader>
      <ListItemButton onClick={() => navigate('/addCourse')}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="수강신청" />
      </ListItemButton>
      <ListItemButton onClick={() => { navigate("/courseRecord")}}>
        <ListItemIcon sx={{ pl: "5px"}}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="성적 확인" />
      </ListItemButton>
    </React.Fragment>
  )
};

export default MainListItems;