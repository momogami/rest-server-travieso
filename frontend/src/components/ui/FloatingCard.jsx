import React from "react";

import { Card, CardHeader, CardContent } from '@mui/material';

const FloatingCard = ({ title, children, sx }) => {
  return (
    <Card sx={sx}>
      {title && (
        <CardHeader title={title}/>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default FloatingCard;
