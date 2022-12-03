import React from "react";
import { TextField, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";

import FloatingCard from "../../components/ui/FloatingCard";
import { nuevoCliente } from "../../services/services";

const NuevoCliente = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await nuevoCliente(values);
      const idCliente = response.data;
      navigate('/nuevoTrueque', { state: { idCliente } });
    } catch (error) {
      console.log(error.message);
      setSubmitting(false);
    }
  };

  return (
    <FloatingCard title="Ingreso nuevo cliente">
      <Formik
        initialValues={{
          correo: '',
          nombre: '',
          apellido: '',
          celular: '',
          rut: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.correo) errors.correo = 'Requerido';
          if (!values.nombre) errors.nombre = 'Requerido';
          if (!values.apellido) errors.apellido = 'Requerido';
          if (!values.celular) errors.celular = 'Requerido';
          if (!values.rut) errors.rut = 'Requerido';
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, isSubmitting }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box sx={{ display: 'grid', gap: '10px', gridTemplateRows: '1fr 1fr 1fr', gridTemplateColumns: '1fr 1fr' }}>
                <TextField
                  autoFocus={true}
                  label="Correo"
                  value={values.correo}
                  error={errors.correo !== undefined}
                  helperText={errors.correo}
                  onChange={(event) => setFieldValue('correo', event.target.value)}
                />
                <TextField
                  label="Nombre"
                  value={values.nombre}
                  error={errors.nombre !== undefined}
                  helperText={errors.nombre}
                  onChange={(event) => setFieldValue('nombre', event.target.value)}
                />
                <TextField
                  label="Apellido"
                  value={values.apellido}
                  error={errors.apellido !== undefined}
                  helperText={errors.apellido}
                  onChange={(event) => setFieldValue('apellido', event.target.value)}
                />
                <TextField
                  label="Teléfono"
                  value={values.celular}
                  error={errors.celular !== undefined}
                  helperText={errors.celular}
                  onChange={(event) => setFieldValue('celular', event.target.value)}
                />
                <TextField
                  label="Rut"
                  value={values.rut}
                  error={errors.rut !== undefined}
                  helperText={errors.rut}
                  onChange={(event) => setFieldValue('rut', event.target.value)}
                />
              </Box>
              <Button type='submit' variant="contained" disabled={isSubmitting}>Continuar</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </FloatingCard >
  );
};

export default NuevoCliente;
