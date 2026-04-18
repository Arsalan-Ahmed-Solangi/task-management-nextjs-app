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
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (inputs) => {
    try {
      if (!inputs.name) {
        throw new Error("Name is required!");
      }

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
      toast.success("Signup successful!");
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
      <AuthHeaders caption="Signup to power your productivity!" />

      <FormInput
        label="Full Name"
        name="name"
        type="text"
        onChange={handleChange}
        value={inputs.name}
        placeholder="Please enter your full name"
        required={true}
      />

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
          onClick={gotoLogin}
          variant="caption"
          sx={{ color: COLORS.textPrimary, mb: 2, cursor: "pointer" }}
        >
          Already have an account? Login
        </Typography>
      </Box>

      <FormButton
        onClick={handleSubmit}
        label="Signup"
        sx={{ backgroundColor: COLORS.primary }}
      />
    </Box>
  );
};

export default Signup;
