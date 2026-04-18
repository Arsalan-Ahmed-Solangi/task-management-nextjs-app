"use client";

import React from "react";
import CreateTaskForm from "@/componenets/pages/tasks/CreateTaskForm";
import { Box, Container } from "@mui/material";

export default function CreateTaskPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box>
        <CreateTaskForm />
      </Box>
    </Container>
  );
}
