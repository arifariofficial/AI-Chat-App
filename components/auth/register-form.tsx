"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { RegisterSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { FormError } from "../form-error";
import { FormSusscess } from "../form-success";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import theme from "@components/theme";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
    form.reset();
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
          margin: "0",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="rounded-xl border border-gray-300"
        >
          <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showLocal
          >
            <Form {...form}>
              <Box
                component="form"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          autoFocus
                          autoComplete="current-email"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          autoComplete="current-password"
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          id="confirmPassword"
                          autoComplete="current-password"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                          InputLabelProps={{ shrink: true }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSusscess message={success} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Create
                </Button>
              </Box>
            </Form>
          </CardWrapper>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
