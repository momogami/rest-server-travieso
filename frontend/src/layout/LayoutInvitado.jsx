import React from "react";
import { Box } from "@mui/material";
import './layout.css';

const LayoutInvitado = ({ children }) => {
  return (
    <Box className="commons">
      <Box className="body">{children}</Box>
    </Box>
  );
};

export default LayoutInvitado;
