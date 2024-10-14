import { Card, styled, Theme } from "@mui/material";

const getCardStyles = (theme: Theme) => ({
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
  [theme.breakpoints.down('sm')]: {
    marginTop: 20,
    transform: 'translateY(0)',
    padding: 32,
  },
} as const)

export const StyledFixRequestForm = styled('form')(({ theme }) => getCardStyles(theme))
export const SubmittedFormSuccessCard = styled(Card)(({ theme }) => ({
  alignItems: 'center',
  ...getCardStyles(theme)
}))
