import { createTheme } from '@mui/material/styles';

export const THEME = createTheme({
  colorSchemes: {
    dark: true,
    light: true,
  },
  palette: {
    mode: 'light',
    backgroundGradient: {
      light: 'linear-gradient(140deg, #F9F3F1 3.67%, #D7D7EA 96.33%)',
      dark: 'linear-gradient(319deg, #161315 3.04%, #222127 96.96%)',
    },
    borderPrimary: {
      light: '#33333e29',
      dark: '#5856667a',
    },
    surface: {
      light: '#ffffff',
      dark: '#302f37',
    },
    text: {
      primary: '#33333e',
      secondary: '#82828a',
    },
    divider: '#33333e14',
  },
});
