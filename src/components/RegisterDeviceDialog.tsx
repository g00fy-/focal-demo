/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  TextField,
  Button,
  DialogActions
} from "@material-ui/core";

export type RegisterDeviceDialogProps = {
  onRegister: (input: { name: string; aisle: string }) => void;
} & DialogProps;

export const RegisterDeviceDialog: React.FC<RegisterDeviceDialogProps> = ({
  onRegister,
  ...props
}) => {
  // Add dialog to register new device by device name and aisle that it's assigned
  const nameRef = useRef<HTMLInputElement>(null);
  const aisleRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const name = nameRef.current!.value;
    const aisle = aisleRef.current!.value;
    e.preventDefault();
    onRegister({ name, aisle });
  };
  return (
    <Dialog {...props}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Register new device</DialogTitle>
        <DialogContent>
          <TextField
            required
            inputRef={nameRef}
            id="name"
            name="name"
            label="Device name"
            autoFocus
            fullWidth
          />
          <TextField
            required
            inputRef={aisleRef}
            id="aisle"
            name="aisle"
            label="Aisle"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Register device
          </Button>
          <Button
            type="button"
            onClick={(e) => props.onClose?.({ event: e }, "backdropClick")}
            color="default"
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
