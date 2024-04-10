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
  Container,
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
      // Handle the error
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
    onSubmit: (values: SignInFormValues, actions: FormikHelpers<SignInFormValues>) => {
      /* handleCredentialsSubmit(values); */
      actions.setSubmitting(false);
    },
  });

  return (
    <ThemeProvider theme={theme}>

     
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mb: 1, bgcolor: "secondary.main" }}>
                <LockPersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ padding: 3, paddingTop: 0 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  autoComplete="current-email"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                    width: "100%",
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
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
      
  

            <Box display="flex" alignItems="center" width="100%" margin="1em 0">
  <Box flexGrow={1} borderBottom={1} borderColor="divider" />
  <Typography variant="body1" margin="1px">
    OR
  </Typography>
  <Box flexGrow={1} borderBottom={1} borderColor="divider" />
</Box>
          <Box>

          <Button
            type="button"
            sx={{ height: "50px", width: "100%" }}
            onClick={() => handleOAuthSignIn("google")}
            >
            <GoogleIcon />
            <p className="ml-3">SIGN IN WITH GOOGLE</p>
          </Button>
          <Button
            type="button"
            sx={{ height: "50px", width: "100%" }}
            onClick={() => handleOAuthSignIn("facebook")}
            variant="contained"
            >
            <FacebookIcon />
            <p className="ml-3">SIGN IN WITH FACEBOOK</p>
          </Button>
          </Box>
          </Container>
    </ThemeProvider>
  );
};

export default SigninPage;
