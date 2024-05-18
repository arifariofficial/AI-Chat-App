"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@components/ui/form";
import { FormError } from "@components/form-error";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getMessageFromCode } from "@lib/utils";

import { login } from "@actions/login";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { useSession } from "next-auth/react";
import { FormSucccess } from "@components/form-success";
import { Button } from "@components/ui/button";

export const LoginForm = () => {
  const { data: session } = useSession();
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

  if (session) {
    window.location.href = "/";
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((result) => {
          if (result?.type === "error") {
            setError(getMessageFromCode(result.resultCode));
          }
          if (result?.type === "success") {
            setSuccess(getMessageFromCode(result.resultCode));
            window.location.href = "/";
          }
          if (result?.type === "twoFactor") {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          const message =
            error.response?.data?.message || "Something went wrong";
          setError(message);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Dont't have an account?"
      backButtonHref="/auth/register"
      showLocal={!showTwoFactor}
    >
      <Form {...form}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div>
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="mb-4 flex justify-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="size-10" />
                          <InputOTPSlot index={1} className="size-10" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} className="size-10" />
                          <InputOTPSlot index={3} className="size-10" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} className="size-10" />
                          <InputOTPSlot index={5} className="size-10" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          disabled={isPending}
                          margin="normal"
                          required
                          fullWidth
                          size="small"
                          id="email"
                          label="Email Address"
                          autoFocus
                          autoComplete="current-email"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                          InputLabelProps={{
                            shrink: true,
                            className: "dark:text-white",
                          }}
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
                          className="border border-border/30"
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
                          InputLabelProps={{
                            shrink: true,
                            className: "dark:text-white",
                          }}
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
                                    <VisibilityIcon className="text-foreground" />
                                  ) : (
                                    <VisibilityOffIcon className="text-foreground" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            className: "bg-background",
                          }}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="mb-2 px-0 font-normal text-foreground"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSucccess message={success} />
          <Button type="submit" variant="outline" className="w-full">
            {isPending ? (
              <CircularProgress size="20px" className="text-foreground" />
            ) : showTwoFactor ? (
              "Confirm"
            ) : (
              "Log in"
            )}
          </Button>
        </Box>
      </Form>
    </CardWrapper>
  );
};
