import { Route } from "react-router-dom";
import IniciarSesion from "../views/InicioSesion/InicioSesion";
import Registrarse from "../views/Registrarse/Registrarse";
import Menu from "../views/Menu/Menu";
import HistorialTrueques from "../views/HistorialTrueques/HistorialTrueques";
import NuevoCliente from "./NuevoCliente/NuevoCliente";
import NuevoTrueque from "./NuevoTrueque/NuevoTrueque";

// import Cargando from "@views/Cargando/Cargando";

const Screens = {
  invitado: {
    IniciarSesion: {
      direccion: "/",
      componente: IniciarSesion,
    },
    Registrarse: {
      direccion: "/registrarse",
      componente: Registrarse,
    },
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

export const obtenerRutasPantallas = (agrupadorPantallas) => {
  const arrRutasPantalla = [];
  for (const strAgrupador of agrupadorPantallas) {
    const arrAgrupadorMetaPantallas = Screens[strAgrupador];

    for (const keyPantalla in arrAgrupadorMetaPantallas) {
      if (Object.hasOwnProperty.call(arrAgrupadorMetaPantallas, keyPantalla)) {
        const pantalla = arrAgrupadorMetaPantallas[keyPantalla];
        const ComponentePantalla = pantalla.componente;

        arrRutasPantalla.push(
          <Route
            exact
            key={keyPantalla}
            path={pantalla.direccion}
            element={<ComponentePantalla name={keyPantalla} />}
          />
        );
      }
    }
  }
  return arrRutasPantalla;
};
