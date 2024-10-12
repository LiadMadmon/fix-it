import { MenuItem, Select, SelectProps } from "@mui/material";
import React from 'react';

export const SeveritySelect = React.forwardRef<HTMLSelectElement, SelectProps & { severity: string }>(
  ({ severity, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        size='small'
        value={severity}
        sx={{
          textAlign: 'left',
        }}
        {...props}
      >
        <MenuItem value={'can-wait'}>Can Wait</MenuItem>
        <MenuItem value={'urgent'}>Urgent</MenuItem>
      </Select>
    );
  }
);
