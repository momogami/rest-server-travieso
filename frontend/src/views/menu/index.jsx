import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import RutClienteDialog from "../../components/dialogs/RutClienteDialog";
import FloatingCard from "../../components/ui/FloatingCard";

export default function Menu() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const onClickNuevoTrueque = () => {
    // abrir dialog
    setOpenDialog(true);
  };
  const onClickHistorialTrueque = () => {
    navigate("/historialTrueques");
  };
  const onClickCerrarSesion = () => {
    navigate("/");
  };

  // esto se ejecuta al confirmar en el dialog
  const handleDialogOnSuccess = (idCliente) => {
    if (idCliente) {
      navigate('/nuevoTrueque', { state: { idCliente } });
    } else {
      navigate('/nuevoCliente',);
    }
  };

  return (
    <FloatingCard title="Menú principal" sx={{minWidth:'50%'}}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickNuevoTrueque}
        >
          Nuevo Trueque
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickHistorialTrueque}
        >
          Historial Trueques
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickCerrarSesion}
        >
          Cerrar Sesión
        </Button>
      </Box>

      <RutClienteDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={(clienteExistente) =>
          handleDialogOnSuccess(clienteExistente)
        }
        onError={() => setOpenDialog(false)}
      />
    </FloatingCard>
  );
}
