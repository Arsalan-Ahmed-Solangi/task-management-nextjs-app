"use client";

import React from "react";
import { Box, Container, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import TasksList from "@/componenets/pages/tasks/TasksList";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";

const DashboardPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              href="/dashboard/create-task"
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <AssignmentIcon
                  sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Create Task
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add a new task
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              href="/dashboard/create-team-members"
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <GroupIcon sx={{ fontSize: 40, color: "success.main", mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Add Team Member
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add new member
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              component={Link}
              href="/dashboard/team-members"
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <GroupIcon sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Team Members
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  View all members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <TasksList />
    </Container>
  );
};

export default DashboardPage;