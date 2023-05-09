import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2f5ffc",
      dark: "#2042b0",
      light: "#587ffc",
    },
    secondary: {
      main: "#fccc2f",
      dark: "#b08e20",
      light: "#fcd658",
    },
  },
  components: {
    MuiChip: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          userSelect: "none",
        },
      },
    },
  },
});
