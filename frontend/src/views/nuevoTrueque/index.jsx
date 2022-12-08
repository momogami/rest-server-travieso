import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Edit, DeleteForever } from "@mui/icons-material";

import FloatingCard from "../../components/ui/FloatingCard";
import PremiumDialog from "../../components/dialogs/PremiumDialog";
import SegundaDialog from "../../components/dialogs/SegundaDialog";
import DescuentoDialog from "../../components/dialogs/DescuentoDialog";
import DonacionDialog from "../../components/dialogs/DonacionDialog";
import ReciclajeDialog from "../../components/dialogs/ReciclajeDialog";
import capitalizeWord from "../../utils/capitalizeWord";

import { crearTruequeCabecera } from "../../services/services";

const NuevoTrueque = () => {
  const defaultState = {
    Premium: [],
    Descuento: [],
    Donacion: [],
    Segunda: [],
    Reciclaje: [],
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [openPremiumDialog, setOpenPremiumDialog] = useState(false);
  const [openSegundaDialog, setOpenSegundaDialog] = useState(false);
  const [openDescuentoDialog, setOpenDescuentoDialog] = useState(false);
  const [openDonacionDialog, setOpenDonacionDialog] = useState(false);
  const [openReciclajeDialog, setOpenReciclajeDialog] = useState(false);
  const [tableContents, setTableContents] = useState(defaultState);

  const onClickPremium = () => setOpenPremiumDialog(true);
  const onClickSegunda = () => setOpenSegundaDialog(true);
  const onClickDescuento = () => setOpenDescuentoDialog(true);
  const onClickDonacion = () => setOpenDonacionDialog(true);
  const onClickReciclaje = () => setOpenReciclajeDialog(true);

  const onClickDelete = (category, item) => {
    const newArr = tableContents[category].filter((e) => e !== item);
    setTableContents({ ...tableContents, [category]: newArr });
  };

  const onClickCancelar = () => navigate("/menu");
  const onClickContinuar = async () => {
    const ids = [];
    Object.keys(tableContents).forEach((key, index) => {
      const items = tableContents[key];

      items.forEach((i) => ids.push(i.id));
    });

    try {
      const idUsuario = localStorage.getItem("uid");
      const idCliente = location.state.idCliente;
      const response = await crearTruequeCabecera({
        idUsuario: idUsuario,
        idCliente: idCliente,
        idsTruequeDetalle: ids,
      });
      navigate("/resumenTrueque", {
        state: {
          resumen: response.data.resumen,
          idTruequeCabecera: response.data.idTruequeCabecera,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const modificarTabla = ({ resumen, truequeDetalle }) => {
    const key = capitalizeWord(resumen.tipoTrueque);
    const newArr = tableContents[key];

    const tipo = resumen.prenda;
    const cantidad = resumen.cantidad;
    const puntos = resumen.puntos;
    const deuda = typeof resumen.deuda === "number" ? resumen.deuda : 0;
    newArr.push({ id: truequeDetalle, tipo, cantidad, deuda, puntos });

    setTableContents({ ...tableContents, [key]: newArr });
  };

  const buildTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo de trueque</TableCell>
              <TableCell>Prenda</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell />
              <TableCell>Deuda</TableCell>
              <TableCell>Puntos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableContents).map((key, index) => {
              const category = tableContents[key];

              let totalDeuda = 0;
              let totalPuntos = 0;
              const listaPrendas = [];
              const listaCantidades = [];
              category.forEach((values) => {
                totalPuntos += values.puntos;
                totalDeuda += values.deuda;
                listaPrendas.push(values.tipo);
                listaCantidades.push(values.cantidad);
              });

              return (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {key}
                  </TableCell>
                  <TableCell>
                    {listaPrendas.map((prenda, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "31px",
                        }}
                        key={`${prenda}-${index}`}
                      >
                        {prenda}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {listaCantidades.map((cantidad, index) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "31px",
                        }}
                        key={`${cantidad}-${index}`}
                      >
                        {cantidad}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {category.map((cat, index) => {
                      return (
                        <Box
                          key={cat._id}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                        >
                          <IconButton>
                            <Edit sx={{ fontSize: "15px" }} />
                          </IconButton>
                          <IconButton onClick={() => onClickDelete(key, cat)}>
                            <DeleteForever sx={{ fontSize: "15px" }} />
                          </IconButton>
                        </Box>
                      );
                    })}
                  </TableCell>
                  <TableCell>{totalDeuda}</TableCell>
                  <TableCell>{totalPuntos}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <FloatingCard title="Nuevo trueque" sx={{ width: "fit-content" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={onClickPremium}>
            Premium
          </Button>
          <Button variant="contained" onClick={onClickSegunda}>
            Segunda
          </Button>
          <Button variant="contained" onClick={onClickDescuento}>
            Descuento
          </Button>
          <Button variant="contained" onClick={onClickDonacion}>
            Donación
          </Button>
          <Button variant="contained" onClick={onClickReciclaje}>
            Reciclaje
          </Button>
        </Box>
        {buildTable()}
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            onClick={onClickCancelar}
          >
            Cancelar
          </Button>
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            onClick={onClickContinuar}
          >
            Continuar
          </Button>
        </Box>
      </Box>

      <PremiumDialog
        isOpen={openPremiumDialog}
        onClose={() => setOpenPremiumDialog(false)}
        onError={(error) => {
          setOpenPremiumDialog(false);
          console.log(error);
        }}
        onSuccess={(data) => {
          setOpenPremiumDialog(false);
          modificarTabla(data);
        }}
      />

      <SegundaDialog
        isOpen={openSegundaDialog}
        onClose={() => setOpenSegundaDialog(false)}
        onError={(error) => {
          setOpenSegundaDialog(false);
          console.log(error);
        }}
        onSuccess={(data) => {
          setOpenSegundaDialog(false);
          modificarTabla(data);
        }}
      />

      <DescuentoDialog
        isOpen={openDescuentoDialog}
        onClose={() => setOpenDescuentoDialog(false)}
        onError={(error) => {
          setOpenDescuentoDialog(false);
          console.log(error);
        }}
        onSuccess={(data) => {
          setOpenDescuentoDialog(false);
          modificarTabla(data);
        }}
      />

      <DonacionDialog
        isOpen={openDonacionDialog}
        onClose={() => setOpenDonacionDialog(false)}
        onError={(error) => {
          setOpenDonacionDialog(false);
          console.log(error);
        }}
        onSuccess={(data) => {
          setOpenDonacionDialog(false);
          modificarTabla(data);
        }}
      />

      <ReciclajeDialog
        isOpen={openReciclajeDialog}
        onClose={() => setOpenReciclajeDialog(false)}
        onError={(error) => {
          setOpenReciclajeDialog(false);
          console.log(error);
        }}
        onSuccess={(data) => {
          setOpenReciclajeDialog(false);
          modificarTabla(data);
        }}
      />
    </FloatingCard>
  );
};

export default NuevoTrueque;
