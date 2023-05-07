import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#af7f49",
      dark: "#7d531f",
      light: "#e3ae76",
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
