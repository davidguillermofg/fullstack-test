import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#5c6bc0' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", system-ui, sans-serif',
  },
});
