import { Alert, AlertProps, Snackbar as SnackbarMui } from "@mui/material";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

let snackbarRoot: ReturnType<typeof createRoot> | null = null;
let modalContainer: HTMLElement | null = null;

export const openSnackbar = (props: AlertProps) => {
  modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  snackbarRoot = createRoot(modalContainer);

  if (snackbarRoot) {
    snackbarRoot.render(<Snackbar {...props} />);
  }

  return snackbarRoot;
};

export const Snackbar = (props: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsOpen(false), 3000);
  }, [])

  return (
    <SnackbarMui
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
    >
      <Alert
        variant="filled"
        sx={{ width: '100%' }}
        {...props}
      />
    </SnackbarMui>
  )
}
