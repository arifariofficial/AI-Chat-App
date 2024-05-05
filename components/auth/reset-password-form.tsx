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
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
    <CardWrapper
      headerLabel="Reset your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
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
                    size="small"
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
                    error={
                      form.getFieldState("password").isTouched &&
                      Boolean(form.formState.errors.password)
                    }
                    helperText={
                      form.getFieldState("password").isTouched &&
                      form.formState.errors.password
                        ? form.formState.errors.password.message
                        : null
                    }
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
                    size="small"
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
                    error={
                      form.getFieldState("confirmPassword").isTouched &&
                      Boolean(form.formState.errors.confirmPassword)
                    }
                    helperText={
                      form.getFieldState("confirmPassword").isTouched &&
                      form.formState.errors.confirmPassword
                        ? form.formState.errors.confirmPassword.message
                        : null
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} time={false} />
          <FormSusscess message={success} time={false} />
          <Button type="submit" fullWidth sx={{ mt: 2, height: 37 }}>
            {isPending ? (
              <CircularProgress size="20px" className="text-[#f5efd1]" />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Form>
    </CardWrapper>
  );
};
