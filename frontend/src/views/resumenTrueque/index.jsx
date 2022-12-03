import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import FloatingCard from "../../components/ui/FloatingCard";
import FormaPagoDialog from "../../components/dialogs/FormaPagoDialog";
import DescuentoFixDialog from "../../components/dialogs/DescuentoFixDialog";
import PuntosExtraDialog from "../../components/dialogs/PuntosExtraDialog";

import { actualizarConResumen } from "../../services/services";

const ResumenTrueque = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [resumen, setResumen] = useState();
  const [idTruequeCabecera, setIdTruequeCabecera] = useState();

  const [openFormaPagoDialog, setOpenFormaPagoDialog] = useState(false);
  const [openDescuentoFixDialog, setOpenDescuentoFixDialog] = useState(false);
  const [openPuntosExtraDialog, setOpenPuntosExtraDialog] = useState(false);

  useEffect(() => {
    setResumen(location.state.resumen);
    setIdTruequeCabecera(location.state.idTruequeCabecera);
  }, [location]);

  const onClickFormaPago = () => setOpenFormaPagoDialog(true);
  const onClickDescuento = () => setOpenDescuentoFixDialog(true);
  const onClickPuntosExtra = () => setOpenPuntosExtraDialog(true);
  const onClickContinuar = async () => {
    try {
      const response = await actualizarConResumen({ resumen, idTruequeCabecera });
      if(response.status === 200){
        alert('Trueque realizado con exito');
        navigate('/menu');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const buildTable = () => {
    if (!resumen) return <></>;

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Total prendas premium y segunda</TableCell>
              <TableCell>{resumen.totalPrendasPremiumSegunda}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Ropa descuento</TableCell>
              <TableCell>{resumen.ropaDescuento}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Descuento</TableCell>
              <TableCell>{resumen.descuento}%</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Puntos extra</TableCell>
              <TableCell>{resumen.puntosExtra}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Puntos por vestuario</TableCell>
              <TableCell>{resumen.puntosVestuario}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Deuda reciclaje</TableCell>
              <TableCell>{resumen.deudaReciclaje}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Total de puntos</TableCell>
              <TableCell>{resumen.totalPuntos}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <FloatingCard title="Resumen del trueque" sx={{ width: 'fit-content' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onClickFormaPago}>Forma pago deuda</Button>
          <Button variant="contained" onClick={onClickDescuento}>Introducir descuento</Button>
          <Button variant="contained" onClick={onClickPuntosExtra}>Introducir puntos extra</Button>
        </Box>
        {buildTable()}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Button sx={{ flex: 1 }} variant="contained" onClick={onClickContinuar}>Continuar</Button>
        </Box>
      </Box>

      <FormaPagoDialog
        isOpen={openFormaPagoDialog}
        onClose={() => setOpenFormaPagoDialog(false)}
        onError={(error) => {
          setOpenFormaPagoDialog(false);
          console.log(error);
        }}
        onSuccess={(accion) => {
          setOpenFormaPagoDialog(false);
          if (accion === 'puntos') {
            const deuda = resumen.deudaReciclaje;
            setResumen({ ...resumen, deudaReciclaje: 0, totalPuntos: resumen.totalPuntos + deuda });
          }
          if (accion === 'cancelar') {
            setResumen({ ...resumen, estadoReciclaje: false });
          }
        }}
      />

      <DescuentoFixDialog
        isOpen={openDescuentoFixDialog}
        onClose={() => setOpenDescuentoFixDialog(false)}
        onError={(error) => {
          setOpenDescuentoFixDialog(false);
          console.log(error);
        }}
        onSuccess={(descuento) => {
          setOpenDescuentoFixDialog(false);
          setResumen({ ...resumen, descuento: descuento });
        }}
      />

      <PuntosExtraDialog
        isOpen={openPuntosExtraDialog}
        onClose={() => setOpenPuntosExtraDialog(false)}
        onError={(error) => {
          setOpenPuntosExtraDialog(false);
          console.log(error);
        }}
        onSuccess={(puntosExtra) => {
          setOpenPuntosExtraDialog(false);
          const currPuntos = parseInt(resumen.totalPuntos);
          const parsedPuntos = parseInt(puntosExtra);
          setResumen({ ...resumen, puntosExtra: parsedPuntos, totalPuntos: currPuntos + parsedPuntos });
        }}
      />
    </FloatingCard>
  );
};

export default ResumenTrueque;
