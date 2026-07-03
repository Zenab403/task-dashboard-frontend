import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline, Container, Paper, Typography, Box,
  Switch, FormControlLabel, LinearProgress
} from "@mui/material";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tasks`
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => setTasks((prev) => [...prev, newTask]);
  const handleTaskUpdated = (updatedTask) =>
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  const handleTaskDeleted = (id) =>
    setTasks((prev) => prev.filter((t) => t._id !== id));

  const completedCount = tasks.filter(t => t.status === "Complete").length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#0052cc" },
      secondary: { main: "#7b2ff7" },
      success: { main: "#00c853" },
      warning: { main: "#ff9800" },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #0052cc, #7b2ff7)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">Task Dashboard</Typography>
          <Typography variant="subtitle1">Organize • Track • Complete</Typography>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
              label="Dark Mode"
            />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Progress Overview</Typography>
          <LinearProgress
            variant="determinate"
            value={completionPercentage}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "#00c853" },
            }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {completedCount} / {totalCount} tasks completed ({completionPercentage.toFixed(0)}%)
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <CreateTask onTaskAdded={handleTaskAdded} />
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;