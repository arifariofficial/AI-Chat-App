"use client";
import React from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import theme from "@providers/theme";

interface SignInFormValues {
  email: string;
  password: string;
}

const signInSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const SignInPage: React.FC = () => {
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      // Perform sign-in logic here
      // For example, using NextAuth signIn function
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      // Handle success or failure accordingly
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
        <CssBaseline />
        <Paper
          elevation={3}
          style={{
            padding: 16,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
                      defaultChecked
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" underline="none">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>

            <Grid container justifyContent="center" style={{ marginTop: 16 }}>
              <Typography variant="body2">Or continue with</Typography>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginBottom: 8 }}
            >
              <Grid item>
                <Button variant="outlined" startIcon={<GoogleIcon />}>
                  Google
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<FacebookIcon />}>
                  Facebook
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Link href="#" variant="body2">
                {"Not a member? Start a 14 day free trial"}
              </Link>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
