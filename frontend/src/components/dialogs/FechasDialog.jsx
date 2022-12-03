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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

const FechasDialog = ({ isOpen, onClose, onError, onSuccess }) => {
  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);

  const onFromDateChange = (newValue) => {
    setFromDate(newValue);
  };

  const onUntilDateChange = (newValue) => {
    setTillDate(newValue);
  };

  const onSubmit = async () => {
    const auxDate = new Date(tillDate);
    auxDate.setDate(auxDate.getDate() + 1)
    onSuccess(fromDate.toISOString().split('T')[0], auxDate.toISOString().split('T')[0]);
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Desde"
            value={fromDate}
            onChange={onFromDateChange}
            inputFormat="dd/MM/yyyy"
            renderInput={(props) => (
              <TextField
                fullWidth
                sx={{
                  color: '#9e9e9e',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  flex: '1 1 50%',
                }}
                name="fromDate"
                {...props}
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Hasta"
            value={tillDate}
            onChange={onUntilDateChange}
            inputFormat="dd/MM/yyyy"
            renderInput={(props) => (
              <TextField
                fullWidth
                sx={{
                  color: '#9e9e9e',
                  borderColor: 'rgba(0, 0, 0, 0.26)',
                  flex: '1 1 50%',
                }}
                name="tillDate"
                {...props}
              />
            )}
          />
        </LocalizationProvider>

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

export default FechasDialog;
