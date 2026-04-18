"use client";

import React from "react";
import SettingsForm from "@/componenets/pages/settings/SettingsForm";
import { Box, Container } from "@mui/material";

export default function SettingsPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box>
        <SettingsForm />
      </Box>
    </Container>
  );
}
