import { MenuItem, Select, SelectProps } from "@mui/material"

export const FixTypeSelect = ({ type, ...props }: SelectProps & { type: string }) => {
  return (
    <Select
      size='small'
      value={type}
      sx={{
        textAlign: 'left'
      }}
      {...props}
    >
      <MenuItem value={'keyboard'}>Keyboard</MenuItem>
      <MenuItem value={'mouse'}>Mouse</MenuItem>
      <MenuItem value={'screen'}>Screen</MenuItem>
    </Select>
  )
}
