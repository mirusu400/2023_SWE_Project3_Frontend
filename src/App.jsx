import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Body from './Body';
import Login from "./pages/Login"
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import theme from './theme';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
function App() {
  const [count, setCount] = useState(0)
  const [cookies, setCookie] = useCookies(['JWT']);
  return (
    <>
      <ThemeProvider theme={theme}>
         {/* { cookies.JWT ? <Body /> : <Login /> } */}
        {<Body />}
      </ThemeProvider>
    </>
  )
}

export default App
