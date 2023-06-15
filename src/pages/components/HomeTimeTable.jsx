import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Divider, Chip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';
import { useEffect } from 'react';

const mock = [
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
]


const HomeTimeTable = () => {

  const [selectedWeek, setSelectedWeek] = useState("월");
  const [data, setData] = useState(mock)

  useEffect(() => {

  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", pb: 1}}>
          <Chip label="월" size="small" onClick={() => setSelectedWeek("월")} color={selectedWeek === "월" ? "primary" : "default"} />
          <Chip label="화" size="small" onClick={() => setSelectedWeek("화")} color={selectedWeek === "화" ? "primary" : "default"} />
          <Chip label="수" size="small" onClick={() => setSelectedWeek("수")} color={selectedWeek === "수" ? "primary" : "default"} />
          <Chip label="목" size="small" onClick={() => setSelectedWeek("목")} color={selectedWeek === "목" ? "primary" : "default"} />
          <Chip label="금" size="small" onClick={() => setSelectedWeek("금")} color={selectedWeek === "금" ? "primary" : "default"} />
        </Box>
        {/* Middle line */}
        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', flexDirection: "column"}}>
          {data.map((item, index) => (
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