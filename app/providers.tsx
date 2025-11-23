"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import Box from "@mui/material/Box";
import { theme } from "../src/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="div"
        sx={{ display: "block", height: "100%", width: "100%" }}
      >
        {children}
      </Box>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 6000,
        }}
      />
    </ThemeProvider>
  );
}
