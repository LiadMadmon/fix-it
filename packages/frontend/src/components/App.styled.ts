import { AppBar, Box, styled } from "@mui/material";
import BGPattern from '../assets/bg-pattern.svg';

export const AppWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  background: theme.palette?.backgroundGradient[theme.palette.mode],
}))

export const BGPatterns = styled(Box)(() => ({
  background: `url(${BGPattern})`,
  inset: 0,
  position: 'absolute',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
}))

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider
}))
