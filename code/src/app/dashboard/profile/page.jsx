"use client";

import React from "react";
import ProfileForm from "@/componenets/pages/profile/ProfileForm";
import { Box, Container } from "@mui/material";

export default function ProfilePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box>
        <ProfileForm />
      </Box>
    </Container>
  );
}
