"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    taskId: null,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        // Demo data for display
        setTasks([
          {
            id: 1,
            title: "Design Landing Page",
            description: "Create a modern landing page design",
            priority: "high",
            status: "in-progress",
            progress: 65,
            assignedTo: "Jane Smith",
            dueDate: "2026-05-15",
          },
          {
            id: 2,
            title: "Setup Database",
            description: "Configure MongoDB for production",
            priority: "high",
            status: "pending",
            progress: 0,
            assignedTo: "John Doe",
            dueDate: "2026-04-30",
          },
          {
            id: 3,
            title: "Write API Documentation",
            description: "Document all REST endpoints",
            priority: "medium",
            status: "in-progress",
            progress: 40,
            assignedTo: "Mike Johnson",
            dueDate: "2026-05-20",
          },
          {
            id: 4,
            title: "Fix Login Bug",
            description: "Debug authentication issue",
            priority: "high",
            status: "completed",
            progress: 100,
            assignedTo: "John Doe",
            dueDate: "2026-04-20",
          },
          {
            id: 5,
            title: "User Testing",
            description: "Conduct user testing sessions",
            priority: "low",
            status: "pending",
            progress: 0,
            assignedTo: "Jane Smith",
            dueDate: "2026-06-01",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Demo data for display
      setTasks([
        {
          id: 1,
          title: "Design Landing Page",
          description: "Create a modern landing page design",
          priority: "high",
          status: "in-progress",
          progress: 65,
          assignedTo: "Jane Smith",
          dueDate: "2026-05-15",
        },
        {
          id: 2,
          title: "Setup Database",
          description: "Configure MongoDB for production",
          priority: "high",
          status: "pending",
          progress: 0,
          assignedTo: "John Doe",
          dueDate: "2026-04-30",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (taskId) => {
    setDeleteDialog({ open: true, taskId });
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/tasks/${deleteDialog.taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== deleteDialog.taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task");
    } finally {
      setDeleteDialog({ open: false, taskId: null });
    }
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      high: "error",
      medium: "warning",
      low: "success",
    };
    return colorMap[priority] || "default";
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: "default",
      "in-progress": "info",
      completed: "success",
    };
    return colorMap[status] || "default";
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "success";
    if (progress >= 50) return "info";
    return "warning";
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        My Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Typography color="textSecondary">No tasks found</Typography>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                {task.status === "completed" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 1,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: "success.main", fontSize: 28 }}
                    />
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        flex: 1,
                        textDecoration:
                          task.status === "completed"
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {task.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2, minHeight: 40 }}
                  >
                    {task.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mb: 1,
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={task.priority}
                        color={getPriorityColor(task.priority)}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={task.status}
                        color={getStatusColor(task.status)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Progress
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {task.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={task.progress}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            getProgressColor(task.progress) === "success"
                              ? "#4caf50"
                              : getProgressColor(task.progress) === "info"
                                ? "#2196f3"
                                : "#ff9800",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Assigned to: {task.assignedTo}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      variant="outlined"
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, taskId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, taskId: null })}
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TasksList;
