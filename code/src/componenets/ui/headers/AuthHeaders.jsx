import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ENV_CONFIG from "@/config/env.config";
import COLORS from "@/theme/colors";
const AuthHeaders = ({ caption }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image
        src="/images/list.png"
        alt="Logo"
        width={70}
        height={70}
      />
      <Typography variant="h6" sx={{ color:COLORS.primary,fontWeight:600 }} >
        {ENV_CONFIG.APP_TITLE}
      </Typography> 
      <Typography variant="caption" sx={{ color:COLORS.textSecondary }}>{caption}</Typography>
    </Box>
  );
};

export default AuthHeaders;
