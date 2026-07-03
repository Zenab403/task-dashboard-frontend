import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";

function CreateTask({ setTasks }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // prevent empty tasks

    try {
      const res = await axios.post("http://localhost:5000/tasks", {
        title,
        status: "Incomplete"
      });

      // ✅ Add new task to state
      setTasks((prev) => [...prev, res.data]);

      // clear input
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="New task title"
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
}

export default CreateTask;
