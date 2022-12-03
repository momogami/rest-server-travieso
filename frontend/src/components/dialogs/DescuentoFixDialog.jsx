import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  Box,
  Divider,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const DescuentoFixDialog = ({ isOpen, onClose, onError, onSuccess }) => {

  const [descuento, setDescuento] = useState(0);

  const onSubmit = async () => {
    onSuccess(descuento);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        <Typography>Descuento</Typography>

        <TextField
          label="Descuento"
          variant="filled"
          type='number'
          value={descuento}
          onChange={(event) => {
            const newValue = event.target.value;
            setDescuento(newValue);
          }}
        />

        <Divider sx={{ paddingTop: "10px" }} />
        <Box sx={{ padding: "10px 0px" }}>
          <DialogActions>
            <Button variant="contained" onClick={() => handleClose()}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={() => onSubmit()}>
              Ingresar
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DescuentoFixDialog;
