"use client";

import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import theme from "@providers/theme";
import { useEffect, useState } from "react";

interface SignInFormValues {
  email: string;
  password: string;
}

const SigninPage = () => {
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (
      values: SignInFormValues,
      actions: FormikHelpers<SignInFormValues>,
    ) => {
      handleCredentialsSubmit(values);
      actions.setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center mt-8 drop-shadow-xl h-screen">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="mx-auto flex w-[300px] max-w-md flex-col items-center rounded-md  border border-gray-400 bg-white px-12 py-4 shadow-md drop-shadow-sm boarder md:w-full">
          <Avatar sx={{ mb: 1, bgcolor: "secondary.main" }}>
            <LockPersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              type="email"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
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
              onBlur={formik.handleBlur}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                height: "50px",
              }}
            >
              Sign in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div className="mx-auto mt-8 flex w-[300px] max-w-md flex-col items-center border-gray-400 rounded-lg gap-4 border bg-white p-12 shadow-xl md:w-full">
          <Button
            fullWidth
            type="button"
            sx={{ height: "50px" }}
            onClick={() => handleOAuthSignIn("google")}
          >
            <GoogleIcon />
            <p className="ml-5">SIGN IN WITH GOOGLE</p>
          </Button>
          <Button
            type="button"
            fullWidth
            sx={{ height: "50px" }}
            onClick={() => handleOAuthSignIn("facebook")}
            variant="contained"
          >
            <FacebookIcon />
            <p className="ml-3"> SIGN IN WITH FACEBOOK</p>
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SigninPage;
