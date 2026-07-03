import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";

function CreateTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Incomplete");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/tasks", {
        title,
        status,
      });
      onTaskAdded(res.data); // saved task from MongoDB
      setTitle("");
      setStatus("Incomplete");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, alignItems: "center" }}
    >
      {/* Task Title field */}
      <TextField
        label="Enter task title..."
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ width: "45%" }}   // 👈 reduced width so button aligns
      />

      {/* Status dropdown */}
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="Incomplete">Incomplete</MenuItem>
        <MenuItem value="Complete">Complete</MenuItem>
      </Select>

      {/* Add Task button */}
      <Button type="submit" variant="contained" color="success">
        Add Task
      </Button>
    </Box>
  );
}

export default CreateTask;