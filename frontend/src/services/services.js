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
