"use client";
import React from "react";
import { Button, CircularProgress } from "@mui/material";

const FormButton = ({
  label = "Submit",
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  fullWidth = true,
  disabled = false,
  loading = false,
  sx = {},
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      size="small"
      sx={{
        textTransform: "none",
        fontWeight: 600,
        py: 1,
        minHeight: 36,
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        label
      )}
    </Button>
  );
};

export default FormButton;