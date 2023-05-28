import { createTheme } from "@mui/material/styles";



const theme = createTheme({
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
      fontSize: "48px",
      fontWeight: "bold",
    }
  }
})

export default theme;