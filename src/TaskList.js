import React, { useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Chip, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Toggle status
  const toggleStatus = async (task) => {
    const newStatus = task.status === "Incomplete" ? "Complete" : "Incomplete";
    try {
      const res = await axios.put(`http://localhost:5000/tasks/${task._id}`, {
        ...task,
        status: newStatus,
      });
      onTaskUpdated(res.data);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      onTaskDeleted(id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Open edit dialog
  const handleEditOpen = (task) => {
    setEditTask(task);
    setNewTitle(task.title);
    setOpen(true);
  };

  // Save edit
  const handleEditSave = async () => {
    if (!editTask) return;
    try {
      const res = await axios.put(`http://localhost:5000/tasks/${editTask._id}`, {
        ...editTask,
        title: newTitle,
      });
      onTaskUpdated(res.data);
      setOpen(false);
      setEditTask(null);
      setNewTitle("");
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Task</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell
                  sx={{
                    textDecoration: task.status === "Complete" ? "line-through" : "none",
                    color: task.status === "Complete" ? "text.secondary" : "text.primary",
                  }}
                >
                  {task.title}
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    color={task.status === "Complete" ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleStatus(task)}
                    sx={{ mr: 1 }}
                  >
                    <AutorenewIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEditOpen(task)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteTask(task._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskList;