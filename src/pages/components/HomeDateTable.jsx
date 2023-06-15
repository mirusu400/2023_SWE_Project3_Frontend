
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Divider, Chip, Grid } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../../theme';

const mock = [
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
  { label: '[관리처] 복지관 정전안내', icon: <NotificationsIcon />, href: '#' },
]

const datebyMonth = {
  1: 31, 2: 28, 3: 31, 4: 30, 5: 31,
  6: 30, 7: 31, 8: 31, 9: 30, 10: 31,
  11: 30, 12: 31
}

const dates = [
  28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  29, 30, 1
]


const HomeDateTable = () => {

  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", pb: 1}}>
          <Typography variant="span" component="span">
            2023. 6
          </Typography>
        </Box>
        {/* Middle line */}
        <Divider sx={{ mb: 1 }} />

        <Grid container spacing={1} sx={{ textAlign: 'center'}}>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              일
            </Typography>
          </Grid>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              월
            </Typography>
          </Grid>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              화
            </Typography>
          </Grid>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              수
            </Typography>
          </Grid>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              목
            </Typography>
          </Grid>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              금
            </Typography>
          </Grid>
          <Grid item xs={1.7}>
            <Typography variant="span" component="span">
              토
            </Typography>
          </Grid>
          {/* {Array.from(Array(datebyMonth[6]).keys()).map((item, index) => (
            <Grid key={index} item xs={1.7}>
              <Typography variant="span" component="span">
                {item + 1}
              </Typography>
            </Grid>
          ))} */}
          
          {dates.map((item, index) => (
            <Grid key={index} item xs={1.7}>
              <Typography variant="span" component="span">
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  )
};

export default HomeDateTable;