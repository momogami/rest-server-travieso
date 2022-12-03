import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import LayoutInvitado from "./layout/LayoutInvitado";
import LayoutUsuario from "./layout/LayoutUsuario";

import IniciarSesion from "./views/inicioSesion";
import Registrarse from "./views/registrarse";
import Menu from "./views/menu";
import HistorialTrueques from "./views/historialTrueques";
import NuevoCliente from "./views/nuevoCliente";
import NuevoTrueque from "./views/nuevoTrueque";

const screens = {
  invitado: {
    IniciarSesion: {
      direccion: "/",
      componente: IniciarSesion,
    },
    Registrarse: {
      direccion: "/registrarse",
      componente: Registrarse,
    },
  },
  usuario: {
    Menu: {
      direccion: "/menu",
      componente: Menu,
    },
    HistorialTrueques: {
      direccion: "/historialTrueques",
      componente: HistorialTrueques,
    },
    NuevoCliente: {
      direccion: "/nuevoCliente",
      componente: NuevoCliente,
    },
    NuevoTrueque: {
      direccion: "/nuevoTrueque",
      componente: NuevoTrueque,
    },
  },
};

const obtenerLayout = (strAgrupador) => {
  switch (strAgrupador) {
    case 'invitado':
      return LayoutInvitado;
    case 'usuario':
      return LayoutUsuario;
    default:
      return Container;
  }
}

const obtenerRutasPantallas = (agrupadorPantallas) => {
  const arrRutasPantalla = [];
  for (const strAgrupador of agrupadorPantallas) {
    const arrAgrupadorMetaPantallas = screens[strAgrupador];
    const ComponenteLayout = obtenerLayout(strAgrupador);

    for (const keyPantalla in arrAgrupadorMetaPantallas) {
      if (Object.hasOwnProperty.call(arrAgrupadorMetaPantallas, keyPantalla)) {
        const pantalla = arrAgrupadorMetaPantallas[keyPantalla];
        const ComponentePantalla = pantalla.componente;

        arrRutasPantalla.push(
          <Route
            exact
            key={keyPantalla}
            path={pantalla.direccion}
            element={<ComponenteLayout><ComponentePantalla name={keyPantalla} /></ComponenteLayout>}
          />
        );
      }
    }
  }
  return arrRutasPantalla;
};

const Router = () => {
  const rutas = obtenerRutasPantallas(["invitado", "usuario"]);

  return (
    <BrowserRouter >
      <Routes>{rutas}</Routes>
    </BrowserRouter>
  );
};

export default Router;
