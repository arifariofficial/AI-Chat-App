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
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getMessageFromCode } from "@/lib/utils";
import { FormSucccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dictionary } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { LocalizedRoutes } from "@/lib/localized-routes";
import { useSearchParams } from "next/navigation";

interface RegisterFormProps {
  className: string;
  dictionary: Dictionary;
  lang: Locale;
  routes: LocalizedRoutes[Locale];
}

export const RegisterForm = ({
  className,
  dictionary,
  lang,
  routes,
}: RegisterFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const searchParams = useSearchParams();

  const redirectEmail = searchParams?.get("email") || "";

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: redirectEmail,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("button clicked");
    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((result) => {
          if (!result) {
            setError("Unexpected error: No response from server.");
            return;
          }

          if (result.type === "error") {
            handleError(result.resultCode);
            if (result.resultCode === "USER_ALREADY_EXISTS") {
              setTimeout(() => {
                window.location.href = `/${lang}${routes.auth.register}`;
              }, 1000);
            }
            return;
          }

          if (result.type === "success") {
            handleSuccess(result.resultCode);
          }
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          const message =
            error.response?.data?.message || "An unexpected error occurred.";
          setError(message);
        });
    });
  };

  // Centralized success handler
  const handleSuccess = (code: string) => {
    const message = getMessageFromCode(code);
    setSuccess(message);
    // Notify the user and redirect after a short delay
    setTimeout(() => {
      window.location.href = `/${lang}${routes.home}`;
    }, 1500);
  };

  // Centralized error handler
  const handleError = (code: string) => {
    const message = getMessageFromCode(code);
    setError(message);
  };

  return (
    <CardWrapper
      className={className}
      headerLabel={dictionary.registerForm.headerLabel}
      showLocal
      backButtonLabel={dictionary.registerForm.alreadyHaveAccount}
      backButtonHref={`/${lang}${routes.auth.signIn}`}
      dictionary={dictionary}
      lang={lang}
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
                    label={dictionary.registerForm.emailAddress}
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
                    label={dictionary.registerForm.password}
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
                            className="hover:bg-inherit hover:text-inherit"
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
                    type="password"
                    label={dictionary.registerForm.confirmPassword}
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
                      form.formState.errors.confirmPassword?.message
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
            }
            label={
              <div className="text-sm">
                {dictionary.registerForm.agreeToTerms}
                <Link
                  href={`/${lang}${routes.terms}`}
                  className="ml-1 underline"
                >
                  {dictionary.registerForm.termsAndConditions}
                </Link>
              </div>
            }
          />
          <FormError message={error} className="mt-2" />
          <FormSucccess message={success} />
          <Button variant="outline" type="submit" className="mt-4 w-full">
            {isPending ? (
              <CircularProgress size="20px" className="text-[#f5efd1]" />
            ) : (
              dictionary.registerForm.submit
            )}
          </Button>
        </Box>
      </Form>
    </CardWrapper>
  );
};
