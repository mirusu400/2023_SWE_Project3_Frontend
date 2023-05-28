import * as React from 'react';

import { styled, createTheme, ThemeProvider, createMuiTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography, Divider, Chip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';

const mock = [
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
]


const HomeTodaysLesson = () => {
  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ display: 'flex', flexDirection: "column"}}>
    {mock.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", my: 0.5 }}>
        <Typography variant="span" component="span">
            {item.label}
        </Typography>
        <Typography variant="span" component="span">
            {item.date}
        </Typography>
        </Box>
    ))}
    </Box>
    </ThemeProvider>
  )
};

export default HomeTodaysLesson;