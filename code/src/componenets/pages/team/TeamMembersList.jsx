"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TeamMembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    memberId: null,
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch("/api/team-members");
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      } else {
        // Demo data for display
        setMembers([
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "developer",
            department: "Engineering",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "designer",
            department: "Design",
          },
          {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            role: "manager",
            department: "Management",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      // Demo data for display
      setMembers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "developer",
          department: "Engineering",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "designer",
          department: "Design",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (memberId) => {
    setDeleteDialog({ open: true, memberId });
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/team-members/${deleteDialog.memberId}`, {
        method: "DELETE",
      });
      setMembers(
        members.filter((member) => member.id !== deleteDialog.memberId)
      );
      toast.success("Team member deleted successfully!");
    } catch (error) {
      toast.error("Error deleting team member");
    } finally {
      setDeleteDialog({ open: false, memberId: null });
    }
  };

  const getRoleColor = (role) => {
    const colorMap = {
      developer: "primary",
      designer: "info",
      manager: "success",
      tester: "warning",
      other: "default",
    };
    return colorMap[role] || "default";
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
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Team Members
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No team members found
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={member.role}
                      color={getRoleColor(member.role)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, memberId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this team member?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, memberId: null })}
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

export default TeamMembersList;
