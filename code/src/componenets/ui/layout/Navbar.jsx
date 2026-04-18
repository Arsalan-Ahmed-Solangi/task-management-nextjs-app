"use client"
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Card,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import COLORS from "@/theme/colors";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Create Task", path: "/dashboard/create-task" },
  { label: "Team Members", path: "/dashboard/team" },
  { label: "Settings", path: "/dashboard/settings" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card
      elevation={1}
      sx={{
        mx: 2,
        mt: 2,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      {/*  NAV */}
      <Box sx={{ display: "flex", gap: 3 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Typography
              key={item.path}
              onClick={() => router.push(item.path)}
              sx={{
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                color: isActive
                  ? COLORS.secondary
                  : COLORS.textWhite,
                position: "relative",
                transition: "0.2s",

                "&::after": isActive
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -4,
                      width: "100%",
                      height: "2px",
                      backgroundColor: COLORS.secondary,
                    }
                  : {},

                "&:hover": {
                  color: COLORS.secondary,
                },
              }}
            >
              {item.label}
            </Typography>
          );
        })}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          onClick={handleOpen}
          sx={{ cursor: "pointer", width: 32, height: 32 }}
          src="https://i.pravatar.cc/150?img=3"
        />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default Navbar;