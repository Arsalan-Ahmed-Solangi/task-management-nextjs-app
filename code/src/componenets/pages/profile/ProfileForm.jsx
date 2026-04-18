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
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileForm = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const [loading, setLoading] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateProfile = () => {
    if (!profile.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!profile.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateProfile()) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setOriginalProfile(profile);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfile(originalProfile);
  };

  const handleLogout = () => {
    try {
      // TODO: Replace with actual logout API call or session clearing
      toast.success("Logging out...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const hasChanges =
    profile.name !== originalProfile.name ||
    profile.email !== originalProfile.email;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        My Profile
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Personal Information
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            margin="normal"
            placeholder="Enter your full name"
            required
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInputChange}
            margin="normal"
            placeholder="Enter your email address"
            required
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
              {loading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Account Actions
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ py: 1.5 }}
          >
            Logout
          </Button>

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block", mt: 2 }}
          >
            You will be logged out and redirected to the login page.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileForm;
