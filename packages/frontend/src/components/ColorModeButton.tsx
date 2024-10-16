import { ColorModeAnimatedIcon } from './ColorModeAnimatedIcon';
import { useColorScheme } from '@mui/material';
import { ColorModeIconWrapper } from './ColorModeButton.styled';

export const ColorModeButton = () => {
  const { mode, setMode } = useColorScheme();

  const handleToggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <ColorModeIconWrapper color={mode === 'light' ? 'black' : 'white'} onClick={handleToggleColorMode}>
      <ColorModeAnimatedIcon />
    </ColorModeIconWrapper>
  );
};
