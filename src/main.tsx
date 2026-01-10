import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App.tsx";

// Core styles
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "./index.css";

const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: "blue",
  fontFamily: "Instrument Sans, Inter, sans-serif",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>
);
