import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  Box,
  TextField,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { obtenerCliente } from "../../services/services";

const RutClienteDialog = ({ isOpen, onClose, onError, onSuccess }) => {
  const [rut, setRut] = useState("");
  const onSubmit = async () => {
    const response = await obtenerCliente(rut);
    onSuccess(response.data.cliente);
  };

  const handleClose = () => {
    setRut("");
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
        <Typography>Ingrese el rut del cliente</Typography>
        <TextField
          label="Rut"
          variant="filled"
          value={rut}
          onChange={(event) => {
            const newValue = event.target.value;
            setRut(newValue);
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

export default RutClienteDialog;
