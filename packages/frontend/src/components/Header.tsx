import { Box, Toolbar, Typography } from "@mui/material"
import { ColorModeButton } from "./ColorModeButton"
import { StyledAppBar } from "./App.styled"

export const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Box sx={{ flexGrow: 1, textAlign: 'left', }}>
          <Typography variant='h5' component='h5' color='textPrimary'>Fix It</Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <ColorModeButton />
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}
