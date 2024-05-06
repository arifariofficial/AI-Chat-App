"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { ResetSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

import { FormError } from "../form-error";
import { FormSusscess } from "../form-success";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";
import { Box, Button, TextField } from "@mui/material";
import IconSpinner from "@components/ui/icons";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isDisable, setIsDisable] = useState(false);

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
      setIsDisable(true);
    });
  };

  return (
    <CardWrapper
      headerLabel="Password Reset"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          {!isDisable && (
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
                      name="email"
                      label="Email Address"
                      autoFocus
                      autoComplete="current-email"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
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
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormError message={error} time={false} />
          <FormSusscess message={success} time={false} />
          {!isDisable && (
            <Button
              type="submit"
              fullWidth
              sx={{ mt: 2, height: 37 }}
              className="disabled:bg-gray-300 disabled:text-gray-600"
            >
              {isPending ? <IconSpinner /> : "Send a recovery link"}
            </Button>
          )}
        </Box>
      </Form>
    </CardWrapper>
  );
};
