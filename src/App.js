import React, { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline, Button } from "@mui/material";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#f50057" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px" }}>
        <h1>Task Dashboard</h1>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </Button>
        <CreateTask />
        <TaskList />
      </div>
    </ThemeProvider>
  );
}

export default App;
