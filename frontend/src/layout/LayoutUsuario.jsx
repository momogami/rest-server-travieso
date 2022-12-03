import React from "react";
import { Box } from "@mui/material";
import './layout.css';

const LayoutUsuario = ({ children }) => {
  return (
    <Box className="commons">
      <Box className="body">{children}</Box>
    </Box>
  );
};

export default LayoutUsuario;