import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";

interface SnackbarProps {
  open: boolean;
  message: string | null;
  autoHideDuration?: number;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  autoHideDuration,
  handleClose,
}) => {
  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose(event, reason);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || null}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="success"
        sx={{ bgcolor: "#2e4342", color: "#ecfeff", fontWeight: "bold" }}
      >
        <div className="flex flex-col items-center justify-center">
          <p className="p-3 text-[#ecfeff]">{message}</p>
          <Button onClick={handleCloseSnackbar}>OK</Button>
        </div>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
