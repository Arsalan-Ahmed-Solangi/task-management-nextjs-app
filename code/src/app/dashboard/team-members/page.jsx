"use client";

import React from "react";
import TeamMembersList from "@/componenets/pages/team/TeamMembersList";
import { Box, Container, Button } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

export default function TeamMembersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box />
        <Button
          component={Link}
          href="/dashboard/create-team-members"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Team Member
        </Button>
      </Box>
      <TeamMembersList />
    </Container>
  );
}
