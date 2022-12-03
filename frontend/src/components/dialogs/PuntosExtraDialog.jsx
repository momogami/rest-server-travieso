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

const PuntosExtraDialog = ({ isOpen, onClose, onError, onSuccess }) => {

  const [puntosExtra, setPuntosExtra] = useState(0);

  const onSubmit = async () => {
    onSuccess(puntosExtra);
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
          label="Puntos extra"
          variant="filled"
          type='number'
          value={puntosExtra}
          onChange={(event) => {
            const newValue = event.target.value;
            setPuntosExtra(newValue);
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

export default PuntosExtraDialog;
