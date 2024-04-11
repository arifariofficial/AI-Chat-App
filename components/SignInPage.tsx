"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { SignInResponse, signIn } from "next-auth/react";
import theme from "@providers/theme";
import { useRouter } from "next/navigation";
import FacebookIcon from "@public/images/FacebookIcon";
import GoogleIcon from "@public/images/GoogleIcon";

interface SignInFormValues {
  email: string;
  password: string;
}

const signInSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const SignInPage: React.FC = () => {
  const router = useRouter();

  const handleCredentialsSubmit = async (values: SignInFormValues) => {
    const { email, password } = values;

    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/");
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (
      values: SignInFormValues,
      actions: FormikHelpers<SignInFormValues>,
    ) => {
      handleCredentialsSubmit(values);
      actions.setSubmitting(false);
    },
  });

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
            padding: 16,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="rounded-lg border border-teal-400 shadow-md shadow-teal-400"
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to your account
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputLabelProps={{ shrink: true }}
            />
            <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Grid item>
                <FormControlLabel
                  sx={{ fontSize: 20 }}
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link href="/password-reset" variant="body2" underline="none">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign in
            </Button>

            <Grid container justifyContent="center" sx={{ mb: 2 }}>
              <Link href="/signup" variant="body2">
                {"Dont't have an account? Sign Up"}
              </Link>
            </Grid>

            <Grid container alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs>
                <hr />
              </Grid>
              <Grid item>
                <Typography variant="body2" px={2}>
                  Or continue with
                </Typography>
              </Grid>
              <Grid item xs>
                <hr />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="space-around"
              style={{ marginBottom: 8 }}
            >
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  onClick={() => handleOAuthSignIn("google")}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    ":hover ": { bgcolor: "#ccced2" },
                    ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleOAuthSignIn("facebook")}
                  startIcon={<FacebookIcon />}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    ":hover ": { bgcolor: "#ccced2" },
                    ".MuiTouchRipple-child ": { bgcolor: "#4b5563" },
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
