"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import SaveIcon from "@mui/icons-material/Save";

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    maxTasks: 50,
    maxMembersPerTask: 5,
  });

  const [loading, setLoading] = useState(false);
  const [originalSettings, setOriginalSettings] = useState({
    maxTasks: 50,
    maxMembersPerTask: 5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSave = async () => {
    if (settings.maxTasks <= 0 || settings.maxMembersPerTask <= 0) {
      toast.error("Values must be greater than 0");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setOriginalSettings(settings);
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Error saving settings: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSettings(originalSettings);
  };

  const hasChanges =
    settings.maxTasks !== originalSettings.maxTasks ||
    settings.maxMembersPerTask !== originalSettings.maxMembersPerTask;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        App Settings
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Task Management Configuration
          </Typography>

          <TextField
            fullWidth
            label="Maximum Tasks That Can Be Created"
            name="maxTasks"
            type="number"
            value={settings.maxTasks}
            onChange={handleInputChange}
            margin="normal"
            placeholder="Enter maximum number of tasks"
            helperText="Set the total limit of tasks that can be created in the system"
            inputProps={{
              min: 1,
            }}
          />

          <TextField
            fullWidth
            label="Maximum Team Members Per Task"
            name="maxMembersPerTask"
            type="number"
            value={settings.maxMembersPerTask}
            onChange={handleInputChange}
            margin="normal"
            placeholder="Enter maximum members per task"
            helperText="Set how many team members can be assigned to a single task"
            inputProps={{
              min: 1,
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={!hasChanges || loading}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!hasChanges || loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save Settings"}
            </Button>
          </Box>

          <Box sx={{ mt: 4, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Current Configuration:
            </Typography>
            <Typography variant="body2">
              • Maximum Tasks: <strong>{settings.maxTasks}</strong>
            </Typography>
            <Typography variant="body2">
              • Maximum Members Per Task: <strong>{settings.maxMembersPerTask}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsForm;
