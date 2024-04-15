"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import theme from "@components/theme";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomSnackbar from "./CustomSnackbar";
import axios from "axios";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter.")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirming password is required"),
});

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleCredentialsSubmit = async (values: SignUpFormValues) => {
    const { email, password } = values;

    const response = await axios
      .post("/api/signup", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.message === "User created successfully") {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
          setErrorMessage(res.data.message);
          setOpen(true);
        } else {
          setErrorMessage(res.data.message);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  };

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
      handleCredentialsSubmit(values);
      actions.setSubmitting(false);
    },
  });

  const handleModalClose = () => {
    setOpen(false);
    router.push("/api/auth/signin");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: 32,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
            transform: "perspective(1px) translateZ(0)",
            transition: "transform 0.3s ease-in-out",
          }}
          className="rounded-xl border border-gray-300"
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up for an account
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={(e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
              }
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
              Sign up
            </Button>

            <Grid container justifyContent="center" sx={{ mb: 2 }}>
              <Link href="/api/auth/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Box>
        </Paper>
        <Paper>
          <CustomSnackbar
            open={open}
            message={errorMessage}
            autoHideDuration={6000}
            handleClose={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setOpen(false);
            }}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
