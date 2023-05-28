import { createTheme } from "@mui/material/styles";



const theme = createTheme({
  palette: {
    primary: {
      main: "#8A160B",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {

        }
      }
    }
  },
  typography: {
    h5: {
      fontSize: 14,
      fontWeight: "bold",
    },
    h4: {
      fontSize: "28px",
      fontWeight: "bold",
    },
    h1: {
      fontSize: "32px",
      fontWeight: 900,
    }
  }
})

export default theme;