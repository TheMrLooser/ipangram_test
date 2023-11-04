import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";

export const ErrorMessage = ({ setError, error }) => {
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={error?.error || error?.success}
    >
      <Alert
        severity={error?.error ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {error?.message}
      </Alert>
    </Snackbar>
  );
};
