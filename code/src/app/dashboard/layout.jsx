import Navbar from "@/componenets/ui/layout/Navbar";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      <Navbar />
      <Box sx={{ m:2 }}>{children}</Box>
    </Box>
  );
}
