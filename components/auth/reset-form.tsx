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
import { Box, Button, Container, Paper, TextField } from "@mui/material";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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
          headerLabel="Password Reset"
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
                name="email"
                render={({ field: { value, onChange, onBlur, ref } }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        disabled={isPending}
                        margin="normal"
                        required
                        fullWidth
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

              <FormError message={error} time={false} />
              <FormSusscess message={success} time={false} />
              <Button type="submit" fullWidth sx={{ mt: 2 }}>
                Send a reset email
              </Button>
            </Box>
          </Form>
        </CardWrapper>
      </Paper>
    </Container>
  );
};
