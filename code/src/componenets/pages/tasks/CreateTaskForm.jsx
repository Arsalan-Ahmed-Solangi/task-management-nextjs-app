"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const CreateTaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedTo: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: "pending",
        }),
      });

      if (response.ok) {
        toast.success("Task created successfully!");
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          assignedTo: "",
          dueDate: "",
        });
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      toast.error("Error creating task: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Create New Task
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Enter task title"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Enter task description"
          multiline
          rows={4}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Assigned To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Team member name"
        />

        <TextField
          fullWidth
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleInputChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Task"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateTaskForm;
