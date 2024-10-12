import { ColorModeAnimatedIcon } from './ColorModeAnimatedIcon';
import { Box, useColorScheme } from '@mui/material';
import { ColorModeIconWrapper } from './ColorModeButton.styled';

export const ColorModeButton = () => {
  const { mode, setMode } = useColorScheme();

  const handleToggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <ColorModeIconWrapper onClick={handleToggleColorMode}>
      <ColorModeAnimatedIcon />
    </ColorModeIconWrapper>
  );
};
