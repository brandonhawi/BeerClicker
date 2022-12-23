import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          userSelect: "none",
        },
      },
    },
  },
});
