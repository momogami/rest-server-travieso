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
import { agregarReciclaje } from "../../services/services";

const ReciclajeDialog = ({ isOpen, onClose, onError, onSuccess }) => {

  const [cantidad, setCantidad] = useState(1);
  const [kilos, setKilos] = useState(0);

  const onSubmit = async () => {
    try {
      const response = await agregarReciclaje({
        kilos: kilos,
        cantidad: cantidad,
      });
      onSuccess(response.data);
    } catch (error) {
      onError(error.message);
    }

  };

  const handleClose = () => {
    setCantidad(1);
    setKilos(0);
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
        <Typography>Reciclaje</Typography>

        <TextField
          label="Cantidad"
          variant="filled"
          type='number'
          value={cantidad}
          onChange={(event) => {
            const newValue = event.target.value;
            setCantidad(newValue);
          }}
        />

        <TextField
          label="Kilos"
          variant="filled"
          type='number'
          value={kilos}
          onChange={(event) => {
            const newValue = event.target.value;
            setKilos(newValue);
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

export default ReciclajeDialog;
