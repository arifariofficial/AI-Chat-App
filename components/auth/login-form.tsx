"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSusscess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { Button as MyButton } from "@components/ui/button";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Somthing went wrong"));
    });
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
            headerLabel="Welcome back"
            backButtonLabel="Dont't have an account?"
            backButtonHref="/auth/register"
            showLocal
          >
            <Form {...form}>
              <Box
                component="form"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
              >
                <div className="space-y-4">
                  {showTwoFactor && (
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Two Factor Code</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              autoFocus
                              name="name"
                              id="code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {!showTwoFactor && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({
                          field: { value, onChange, onBlur, ref },
                        }) => (
                          <FormItem>
                            <FormControl>
                              <TextField
                                disabled={isPending}
                                margin="normal"
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
                        render={({
                          field: { value, onChange, onBlur, ref },
                        }) => (
                          <FormItem>
                            <FormControl>
                              <TextField
                                disabled={isPending}
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
                                        onClick={() =>
                                          setShowPassword(!showPassword)
                                        }
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
                            <MyButton
                              size="sm"
                              variant="link"
                              asChild
                              className="px-0 font-normal"
                            >
                              <Link href="/auth/reset">Forgot password?</Link>
                            </MyButton>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
                <FormError message={error || urlError} />
                <FormSusscess message={success} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  {showTwoFactor ? "Confirm" : "Login"}
                </Button>
              </Box>
            </Form>
          </CardWrapper>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
