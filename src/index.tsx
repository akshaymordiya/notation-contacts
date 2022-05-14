import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles"; 
import reportWebVitals from './reportWebVitals';
import globalTheme, { MuiScrollBarStyles } from './config/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={globalTheme}>
    <GlobalStyles styles={MuiScrollBarStyles} />
    <CssBaseline />
    <App />
  </ThemeProvider>
);

reportWebVitals();
