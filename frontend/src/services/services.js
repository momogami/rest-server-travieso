import apiCall from "./apiAdapter";

export const logIn = async (correo, password) => {
  const response = await apiCall("post", "api/auth/login", {
    correo,
    password,
  });
  return response;
};

export const obtenerCliente = async (rut) => {
  const response = await apiCall("post", "api/clientes/obtenerCliente", {
    rut,
  });
  return response;
};

export const nuevoCliente = async (formData) => {
  const response = await apiCall("post", "api/clientes", {...formData});
  return response;
};

export const obtenerRopasTallasPremium = async () => {
  const response = await apiCall("get", "api/detalles/obtenerRopasTallasPremium", {});
  return response;
};

export const agregarPremium = async (formData) => {
  const response = await apiCall("post", "api/truequeDetalles/agregarPremium", {...formData});
  return response;
};

export const obtenerPrendasSegunda = async () => {
  const response = await apiCall("get", "api/detalles/obtenerPrendasSegunda", {});
  return response;
};

export const agregarSegunda = async (formData) => {
  const response = await apiCall("post", "api/truequeDetalles/agregarSegunda", {...formData});
  return response;
};

export const obtenerPrendasDescuento = async () => {
  const response = await apiCall("get", "api/detalles/obtenerPrendasDescuento", {});
  return response;
};

export const agregarDescuento = async (formData) => {
  const response = await apiCall("post", "api/truequeDetalles/agregarDescuento", {...formData});
  return response;
};

export const obtenerPrendasDonacion = async () => {
  const response = await apiCall("get", "api/detalles/obtenerPrendasDonacion", {});
  return response;
};

export const agregarDonacion = async (formData) => {
  const response = await apiCall("post", "api/truequeDetalles/agregarDonacion", {...formData});
  return response;
};

export const agregarReciclaje = async (formData) => {
  const response = await apiCall("post", "api/truequeDetalles/agregarReciclaje", {...formData});
  return response;
};

export const crearTruequeCabecera = async (formData) => {
  const response = await apiCall("post", "api/truequeCabeceras/crearTruequeCabecera", {...formData});
  return response;
};

export const actualizarConResumen = async (formData) => {
  const response = await apiCall("put", "api/truequeCabeceras/actualizarConResumen", {...formData});
  return response;
};

export const historialTrueques = async (formData) => {
  const response = await apiCall("get", "api/truequeCabeceras/historialTrueques", {...formData});
  return response;
};

export const consultaEntreFechas = async (formData) => {
  const response = await apiCall("post", "api/truequeCabeceras/consultaEntreFechas", {...formData});
  return response;
};
