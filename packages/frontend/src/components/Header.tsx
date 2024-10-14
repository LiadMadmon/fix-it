import { Toolbar, Typography, useTheme } from "@mui/material"
import { ColorModeButton } from "./ColorModeButton"
import { StyledAppBar } from "./App.styled"
import { useFixRequestStore } from "../stores/fix-store";

export const Header = () => {
  const { rejectedFixesCount, doneFixesCount } = useFixRequestStore();
  const theme = useTheme();

  return (
    <StyledAppBar>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography color={theme.palette.text.primary} variant='h5' component='h5'>Fix It</Typography>
        <Typography alignSelf='center' color={theme.palette.text.primary} variant='body1' justifySelf='center'>{`Solved(${doneFixesCount}) | Rejected(${rejectedFixesCount})`}</Typography>
        <ColorModeButton />
      </Toolbar>
    </StyledAppBar>
  )
}
