import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { historialTrueques, consultaEntreFechas } from "../../services/services";
import FloatingCard from "../../components/ui/FloatingCard";
import FechasDialog from "../../components/dialogs/FechasDialog";

const HistorialTrueques = () => {
  const navigate = useNavigate();
  const [trueques, setTrueques] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchHistorial();
  }, [])

  const fetchHistorial = async () => {
    const response = await historialTrueques();
    setTrueques(response.data);
  };

  const onClickFiltroFechas = () => setOpenDialog(true);

  const onClickAtras = () => {
    navigate('/menu');
  };

  const buildTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre completo</TableCell>
              <TableCell>Rut</TableCell>
              <TableCell>Descuento</TableCell>
              <TableCell>Reciclaje</TableCell>
              <TableCell>Puntos totales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trueques.map((trueque) => {
              return (
                <TableRow
                  key={`${trueque.nombreCliente}-${trueque.puntos}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{trueque.nombrecliente}</TableCell>
                  <TableCell>{trueque.rut}</TableCell>
                  <TableCell>{trueque.descuento}</TableCell>
                  <TableCell>{trueque.reciclaje}</TableCell>
                  <TableCell>{trueque.puntos}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <FloatingCard title="Historial de trueques" sx={{ width: 'fit-content' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onClickFiltroFechas}>Generar historial entre fechas</Button>
        </Box>
        {buildTable()}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Button sx={{ flex: 1 }} variant="contained" onClick={onClickAtras}>Atrás</Button>
        </Box>
      </Box>

      <FechasDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onError={(error) => {
          setOpenDialog(false);
          console.log(error);
        }}
        onSuccess={async (from, till) => {
          setOpenDialog(false);
          const response = await consultaEntreFechas({ fechaInicio: from, fechaFin: till });
          navigate('/historialEntreFechas', {
            state: {trueques: response.data},
          });
        }}
      />
    </FloatingCard>
  );
};

export default HistorialTrueques;
