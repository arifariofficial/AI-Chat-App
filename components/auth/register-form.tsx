"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { RegisterSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { FormError } from "../form-error";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getMessageFromCode } from "@/lib/utils";
import { FormSucccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";

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
      register(values)
        .then((result) => {
          if (result?.type === "error") {
            setError(getMessageFromCode(result.resultCode));
            if (result.resultCode === "USER_ALREADY_EXISTS") {
              setTimeout(() => {
                window.location.href = "/auth/login";
              }, 1000);
            }
          }
          if (result?.type === "success") {
            setSuccess(getMessageFromCode(result.resultCode));
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log("Error registering user:", error);
          const message =
            error.response?.data?.message || "Something went wrong";
          setError(message);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Luo tili"
      showLocal
      backButtonLabel="Onko sinulla jo tili?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field: { value, onChange, onBlur, ref, name } }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    disabled={isPending}
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    name={name}
                    label="Email Address"
                    autoFocus
                    autoComplete="current-email"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    InputLabelProps={{ shrink: true }}
                    error={
                      form.getFieldState("email").isTouched &&
                      Boolean(form.formState.errors.email)
                    }
                    helperText={
                      form.getFieldState("email").isTouched &&
                      form.formState.errors.email
                        ? form.formState.errors.email.message
                        : null
                    }
                  />
                </FormControl>
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
                    disabled={isPending}
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="password"
                    name="password"
                    label="Password"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
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
              </FormItem>
            )}
          />
          <FormError message={error} className="mt-2" />
          <FormSucccess message={success} />
          <Button variant="outline" type="submit" className="mt-4 w-full">
            {isPending ? (
              <CircularProgress size="20px" className="text-[#f5efd1]" />
            ) : (
              "Luo"
            )}
          </Button>
        </Box>
      </Form>
    </CardWrapper>
  );
};
