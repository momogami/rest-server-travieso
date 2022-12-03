import React from "react";
import {
  Dialog,
  DialogActions,
  Box,
  Typography,
  Button,
} from "@mui/material";

const FormaPagoDialog = ({ isOpen, onClose, onError, onSuccess }) => {
  const handleClose = () => {
    onClose();
  };

  const onPuntos = () => {
    onSuccess('puntos');
  };

  const onCancelar = () => {
    onSuccess('cancelar');
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
        <Typography>¿Cómo desea cancelar el monto del reciclaje?</Typography>

        <Box sx={{ padding: "10px 0px" }}>
          <DialogActions>
            <Button variant="contained" onClick={() => onPuntos()}>
              Puntos
            </Button>
            <Button variant="contained" onClick={() => onCancelar()}>
              Cancelar reciclaje
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FormaPagoDialog;
