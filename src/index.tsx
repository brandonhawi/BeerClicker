import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./Game";
import Box from "@mui/material/Box";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import BeerClickNumber from "./viewComponents/BeerClickNumber";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Box
        component="div"
        sx={{ display: "block", height: "100%", width: "100%" }}
      >
        <Game />
      </Box>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 6000,
        }}
      />
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <BeerClickNumber />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
