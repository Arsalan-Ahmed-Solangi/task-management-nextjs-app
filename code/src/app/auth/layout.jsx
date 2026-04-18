"use client"
import { Box,Card } from "@mui/material";
export default function AuthLayout({ children }) {
  return (
    <Box sx={{  display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>       
       <Card sx={{ width: 500, p: 4,boxShadow: 2 }}> {children}</Card>
    </Box>
  );
}
