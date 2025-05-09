import { createTheme } from "@mui/material/styles";

/**
 * Custom theme for the application.
 * This theme defines the color palette, typography, and component styles.
 */
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
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1536,
    },
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
