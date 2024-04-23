"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { ResetPasswordSchema } from "@/lib/Schema";
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
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/reset-password";

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconSpinner from "@components/ui/icons";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values, token).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
          window.location.href = "/auth/login";
        }
      });
    });
  };

  return (
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
          headerLabel="Reset your password"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
        >
          <Form {...form}>
            <Box
              component="form"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        disabled={isPending}
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
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
                        disabled={isPending}
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
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

              <FormError message={error} time={false} />
              <FormSusscess message={success} time={false} />
              <Button type="submit" fullWidth sx={{ mt: 2, height: 37 }}>
                {isPending ? <IconSpinner /> : "Save"}
              </Button>
            </Box>
          </Form>
        </CardWrapper>
      </Paper>
    </Container>
  );
};
