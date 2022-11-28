import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const columns = [
  { field: 'nombreCompleto', headerName: 'Nombre completo', width: 130 },
  { field: 'rut', headerName: 'Rut', width: 130 },

  { field: 'descuento', 
    headerName: 'Descuento', 
    type: 'number',
    width: 90 
  },

  {
    field: 'deuda',
    headerName: 'Deuda',
    type: 'number',
    width: 90,
  },
  {
    field: 'puntos',
    headerName: 'Puntos',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Felipe', firstName: 'Camiroaga', age: 65 },
];

export default function DataTable() {
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <div style={{ height: 400, width: '200%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
      />
    </div>
    </Box>
    </Container>
  );
}