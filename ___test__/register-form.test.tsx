import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theme from "@components/theme";
import { ThemeProvider } from "@mui/material/styles";
import { RegisterForm } from "@components/auth/register-form";

describe("RegisterForm", () => {
  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <RegisterForm />
      </ThemeProvider>,
    );

  it("renders the form and allows user to submit", async () => {
    setup();

    // Check if the email input is rendered
    const emailInput = screen.getByLabelText(
      /email address/i,
    ) as HTMLInputElement;
    expect(emailInput).toBeInTheDocument();

    // Fill out the form
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password");
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      "password",
    );

    // Mock the register function before implementing the click event
    // Assuming register is a mock function
    // Example: jest.mock('@/actions/register', () => ({ register: jest.fn() }));

    // Click the submit button
    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Optionally, wait for something to happen if the form submission is asynchronous
    await waitFor(() => {
      // Expectations after form submission, e.g., checking for a success message
      // Example: expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
    });
  });
});
