import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  Box,
  Divider,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import { obtenerPrendasDescuento, agregarDescuento } from "../../services/services";

const DescuentoDialog = ({ isOpen, onClose, onError, onSuccess }) => {
  const [optionsPrenda, setOptionsPrenda] = useState([]);

  const [selectedPrenda, setSelectedPrenda] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    }
  }, [isOpen]);

  const fetchOptions = async () => {
    const response = await obtenerPrendasDescuento();
    const { listaPrendas } = response.data;
    setOptionsPrenda(listaPrendas);
  };

  const onSubmit = async () => {
    try {
      const response = await agregarDescuento({
        ropa: selectedPrenda,
        cantidad: cantidad,
      });
      onSuccess(response.data);
    } catch (error) {
      onError(error.message);
    }

  };

  const handleClose = () => {
    setSelectedPrenda(null);
    setCantidad(1);
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

        <InputLabel id="prenda-label">Prenda</InputLabel>
        <Select
          labelId="prenda-label"
          value={selectedPrenda || ''}
          onChange={(event) => setSelectedPrenda(event.target.value)}
        >
          {optionsPrenda.map((prenda) => {
            return <MenuItem key={prenda} value={prenda}>{prenda}</MenuItem>;
          })}
        </Select>

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

        <Divider sx={{ paddingTop: "10px" }} />
        <Box sx={{ padding: "10px 0px" }}>
          <DialogActions>
            <Button variant="contained" onClick={() => handleClose()}>
              Cancelar
            </Button>
            <Button variant="contained" disabled={selectedPrenda === null} onClick={() => onSubmit()}>
              Ingresar
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DescuentoDialog;
