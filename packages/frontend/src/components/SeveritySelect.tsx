import { MenuItem, Select, SelectProps } from "@mui/material"

export const SeveritySelect = ({ severity, ...props }: SelectProps & { severity: string }) => {
  return (
    <Select
      size='small'
      value={severity}
      sx={{
        textAlign: 'left'
      }}
      {...props}
    >
      <MenuItem value={'can-wait'}>Can Wait</MenuItem>
      <MenuItem value={'urgent'}>Urgent</MenuItem>
    </Select>
  )
}