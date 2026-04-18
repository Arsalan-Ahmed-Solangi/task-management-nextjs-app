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
  password: "",
};

const Login = () => {
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

      if (!inputs.password) {
        throw new Error("Password is required!");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleSubmit = () => {
    try {
      validate(inputs);
      toast.success("Login successful!");
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      console.log(`~ERROR handleSubmit:`, err.message);
      toast.error(err.message);
    }
  };

  const gotoSignup = () => {
    return router.push("/auth/signup");
  };

  const gotoForgetPassword = () => {
    return router.push("/auth/forget-password");
  };

  return (
    <Box>
      <AuthHeaders caption="Please login to ignite the system!" />

      <FormInput
        label="Email Address"
        name="email"
        type="text"
        onChange={handleChange}
        value={inputs.email}
        placeholder="Please enter your registered email"
        required={true}
      />

      <FormInput
        label="Password"
        name="password"
        onChange={handleChange}
        type="password"
        value={inputs.password}
        placeholder="please enter your password"
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
          onClick={gotoForgetPassword}
          variant="caption"
          sx={{ color: COLORS.textPrimary,cursor:"pointer" }}
        >
          Forget Password?
        </Typography>
        <Typography
          onClick={gotoSignup}
          variant="caption"
          sx={{ color: COLORS.textPrimary, mb: 2,cursor:"pointer" }}
        >
          Don't have an account? Signup
        </Typography>
      </Box>

      <FormButton
        onClick={handleSubmit}
        label="Login"
        sx={{ backgroundColor: COLORS.primary }}
      />
    </Box>
  );
};

export default Login;
