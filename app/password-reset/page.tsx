"use client";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  FormHelperText,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import theme from "@providers/theme";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
});

export default function PasswordResetPage() {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/auth/password-reset", values);
        setMessage(response.data.message);
        formik.resetForm();
        router.push("/reset");
      } catch (error: any) {
        console.log(error.response.data.error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        component="main"
        sx={{
          height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box className="w-full rounded-xl border px-10 py-20 shadow-xl">
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
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
              InputLabelProps={{ shrink: true }}
            />
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
          {message && (
            <Typography sx={{ mt: 3 }} variant="body2">
              {message}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
