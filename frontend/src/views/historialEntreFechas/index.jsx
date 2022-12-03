import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import FloatingCard from "../../components/ui/FloatingCard";

const HistorialEntreFechas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trueques, setTrueques] = useState([]);

  useEffect(() => {
    setTrueques(location.state.trueques);
  }, [location]);

  const onClickAtras = () => {
    navigate('/historialTrueques');
  };

  const buildTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Trabajador</TableCell>
              <TableCell>Nombre cliente</TableCell>
              <TableCell>Rut</TableCell>
              <TableCell>Kilos/Deuda</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Segunda</TableCell>
              <TableCell>Descuentos</TableCell>
              <TableCell>Valor de descuento</TableCell>
              <TableCell>Donación</TableCell>
              <TableCell>Cantidad prendas</TableCell>
              <TableCell>Puntos totales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trueques.map((tr) => {
              return (
                <TableRow
                  key={`${tr.ID}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{tr.ID}</TableCell>
                  <TableCell>{tr.nombreTrabajador}</TableCell>
                  <TableCell>{tr.NombreCliente}</TableCell>
                  <TableCell>{tr.rut}</TableCell>
                  <TableCell>{tr.kilosConDeuda}</TableCell>
                  <TableCell>{tr.premium.map((item, index) => <Box key={`${item}-${index}`}>{item}</Box>)}</TableCell>
                  <TableCell>{tr.segunda.map((item, index) => <Box key={`${item}-${index}`}>{item}</Box>)}</TableCell>
                  <TableCell>{tr.descuento.map((item, index) => <Box key={`${item}-${index}`}>{item}</Box>)}</TableCell>
                  <TableCell>{tr.valorDescuento}%</TableCell>
                  <TableCell>{tr.donacion.map((item, index) => <Box key={`${item}-${index}`}>{item}</Box>)}</TableCell>
                  <TableCell>{tr.cantidadTotal}</TableCell>
                  <TableCell>{tr.puntosTotales}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <FloatingCard title="Trueques entre fechas" sx={{ maxWidth: '90%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {buildTable()}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Button sx={{ flex: 1 }} variant="contained" onClick={onClickAtras}>Atrás</Button>
        </Box>
      </Box>
    </FloatingCard>
  );
};

export default HistorialEntreFechas;
