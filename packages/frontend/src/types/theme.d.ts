import { ThemeOptions } from "@mui/material";
import { getTypography } from "./typography";
import { getPalette } from "./palette";

declare module '@mui/material/styles/createPalette' {
  interface ThemeOptions { }
  interface Palette {
    backgroundGradient: {
      light: string;
      dark: string;
    },
    borderPrimary: {
      light: string;
      dark: string;
    },
    surface: {
      light: string;
      dark: string;
    },
  }
  interface PaletteOptions {
    backgroundGradient: {
      light: string;
      dark: string;
    },
    borderPrimary: {
      light: string;
      dark: string;
    },
    surface: {
      light: string;
      dark: string;
    },
  }
}
