"use client";

import React from "react";
import CreateTeamMemberForm from "@/componenets/pages/team/CreateTeamMemberForm";
import { Box, Container } from "@mui/material";

export default function CreateTeamMembersPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box>
        <CreateTeamMemberForm />
      </Box>
    </Container>
  );
}
