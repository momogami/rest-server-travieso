import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';

const columns = [
  { field: 'nombreCompleto', headerName: 'Nombre completo', width: 180 },
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
  { id: '38123901280', nombreCompleto: 'Camilo Sesto', rut: '201646634', descuento: 30, deuda: 990, puntos: 10000 },
  { id: '3211312sd11', nombreCompleto: 'Victor el Scrum', rut: '574653391', descuento: 42, deuda: 1800, puntos: 3127 },
  { id: 'dsad87a8jda', nombreCompleto: 'Manuela Distemper', rut: '201756643', descuento: 45, deuda: 3500, puntos: 3213 },
  { id: 'dashdsa87d9', nombreCompleto: 'Kike Morande', rut: '1064355486', descuento: 16, deuda: 3450, puntos: 21312 },
  
];

export default function DataTable() {
  return (
    <Container component="main" maxWidth="xs">
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