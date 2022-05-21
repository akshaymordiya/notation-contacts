import { createTheme } from "@mui/material/styles";
import { blueGrey, grey, teal } from "@mui/material/colors"

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
      main: teal[300],
      light: teal[100],
      dark: teal[500],
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
    },
    background: {
      default: grey[50]
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
        },
        background: grey[100]
      },
    },
  },
})

export default globalTheme