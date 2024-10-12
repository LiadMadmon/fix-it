import { Card, styled } from "@mui/material";

export const StyledFixRequestForm = styled('form')(({ theme }) => ({
  display: 'flex',
  padding: 50,
  gap: 20,
  width: 'fit-content',
  margin: '0 auto',
  marginTop: '50vh',
  transform: 'translateY(-50%)',
  flexDirection: 'column',
  borderRadius: 24,
  background: theme.palette.surface[theme.palette.mode],
}))

export const SubmittedFormSuccessCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: 50,
  margin: '0 auto',
  marginTop: '50vh',
  transform: 'translateY(-50%)',
  flexDirection: 'column',
  borderRadius: 24,
  background: theme.palette.surface[theme.palette.mode],
}))
