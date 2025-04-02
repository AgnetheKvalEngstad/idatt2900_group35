
import { createTheme } from "@mui/material/styles";



const theme = createTheme({
    palette: {
      primary: {
        main: "#0059A1",
      },
      secondary: {
        main: "#1F4360",
      },
      success: {
        main: "#0F3D75",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
      fontSize: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 20px",
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            textTransform: "none",
          },
        },
      },
    },
  });

export default theme;