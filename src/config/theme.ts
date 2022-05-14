import { createTheme } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors"

declare module '@mui/material/styles' {
  interface Palette {
    base: Palette['primary'];
  }
  interface PaletteOptions {
    base: PaletteOptions['primary'];
  }
}

export const MuiScrollBarStyles = {
  '*::-webkit-scrollbar': {
    width: '0.2em',
  },
  '*::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    height: '20%',
    borderRadius: '0.5rem'
  },
}

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#4db6ac",
      light: "#b2dfdb",
      dark: "#00a152",
    },
    secondary: {
      main: blueGrey[900],
      light: grey[400],
      dark: grey[900]
    },
    base: {
      main: grey[100],
      light: "#fff",
      dark: grey[800]
    }
  },
  typography: {
    fontFamily: "Nunito, sans-serif"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Nunito, sans-serif",
          src: `url(https://fonts.googleapis.com/css2?family=Macondo&family=Nunito:wght@400;700&display=swap')`
        }
      }
    },
  },
})

export default globalTheme