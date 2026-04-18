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

const CreateTeamMemberForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "developer",
    department: "",
    phone: "",
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

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/team-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Team member added successfully!");
        setFormData({
          name: "",
          email: "",
          role: "developer",
          department: "",
          phone: "",
        });
      } else {
        toast.error("Failed to add team member");
      }
    } catch (error) {
      toast.error("Error adding team member: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Add Team Member
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Enter team member name"
          required
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Enter email address"
          required
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Enter phone number"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            label="Role"
          >
            <MenuItem value="developer">Developer</MenuItem>
            <MenuItem value="designer">Designer</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="tester">Tester</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          margin="normal"
          placeholder="Enter department"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add Team Member"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateTeamMemberForm;
