import { Box, styled } from "@mui/material";

export const ColorModeIconWrapper = styled(Box)(({ theme }) => ({
  padding: 4,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.borderPrimary[theme.palette.mode]}`,
  ':hover': {
    cursor: 'pointer',
  }
}))