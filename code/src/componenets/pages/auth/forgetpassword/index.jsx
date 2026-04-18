"use client";
import FormButton from "@/componenets/ui/form/FormButton";
import FormInput from "@/componenets/ui/form/FormInput";
import AuthHeaders from "@/componenets/ui/headers/AuthHeaders";
import COLORS from "@/theme/colors";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DEFAULT_INPUTS = {
  email: "",
};

const ForgetPassword = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (inputs) => {
    try {
      if (!inputs.email) {
        throw new Error("Email is required!");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSubmit = () => {
    try {
      validate(inputs);
      toast.success("Forget password request submitted!");
    } catch (err) {
      console.log(`~ERROR handleSubmit:`, err.message);
      toast.error(err.message);
    }
  };

  const gotoLogin = () => {
    return router.push("/auth/login");
  };

  return (
    <Box>
      <AuthHeaders caption="Forget credentials, don't worry we'll help you!" />

      <FormInput
        label="Email Address"
        name="email"
        type="text"
        onChange={handleChange}
        value={inputs.email}
        placeholder="Please enter your registered email"
        required={true}
      />

      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          onClick={gotoLogin}
          variant="caption"
          sx={{ color: COLORS.textPrimary, cursor: "pointer" }}
        >
          Remember your password? Login
        </Typography>
      </Box>

      <FormButton
        onClick={handleSubmit}
        label="Submit"
        sx={{ backgroundColor: COLORS.primary }}
      />
    </Box>
  );
};

export default ForgetPassword;
