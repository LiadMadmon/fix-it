import { MenuItem, Select, SelectProps } from "@mui/material";
import React from 'react';

export const FixTypeSelect = React.forwardRef<HTMLSelectElement, SelectProps & { type: string }>(
  ({ type, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        size='small'
        value={type}
        sx={{
          textAlign: 'left',
        }}
        {...props}
      >
        <MenuItem value={'keyboard'}>Keyboard</MenuItem>
        <MenuItem value={'mouse'}>Mouse</MenuItem>
        <MenuItem value={'screen'}>Screen</MenuItem>
      </Select>
    );
  }
);