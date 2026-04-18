"use client";
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import COLORS from "@/theme/colors";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  fullWidth = true,
  required = false,
  disabled = false,
  size = "small",
  variant = "outlined",
  sx = {},
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>
        {label}{" "}
        <span style={{ color: COLORS.error }}> {required && "*"}</span>{" "}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        size={size}
        variant={variant}
        sx={{
          "& .MuiInputBase-input::placeholder": {
            fontSize: "12px",
          },
          ...sx,
        }}
      />
    </Box>
  );
};

export default FormInput;
