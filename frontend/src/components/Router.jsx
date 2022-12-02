import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { obtenerRutasPantallas } from "../views/viewsIndex";


function Router() {
  const [rutas, setRutas] = useState(obtenerRutasPantallas(["invitado", "genericas"]));
  const [session] = useState(false);

  useEffect(() => {
    if (session) setRutas(obtenerRutasPantallas(["usuario", "genericas"]));
    else setRutas(obtenerRutasPantallas(["invitado", "genericas"]));
  }, [session]);

  return (
    <BrowserRouter>
      <Routes>{rutas}</Routes>
    </BrowserRouter>
  );
}

export default Router;
