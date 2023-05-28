
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Divider, Chip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';

const mock = [
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
]


const HomeTimeTable = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", pb: 1}}>
          <Chip label="월" size="small" />
          <Chip label="화" size="small" />
          <Chip label="수" size="small" />
          <Chip label="목" size="small" />
          <Chip label="금" size="small" />     
        </Box>
        {/* Middle line */}
        <Divider sx={{ my: 1 }} />

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
      </Box>
    </ThemeProvider>
  )
};

export default HomeTimeTable;