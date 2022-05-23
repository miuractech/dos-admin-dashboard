import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import './styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import App from './app/app';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#161c33',
    },
    secondary: {
      main: '#ff002e',
    },
    success: {
      main: '#34A853',
    },
    error: {
      main: '#FE2121',
    },
    text: {
      secondary: 'rgba(249,249,249,0.54)',
    },
    background: {
      default: '#FBFAF8',
    },
    info: {
      main: "#167AF9",
    }
  },

  typography: {
    h3: {
      fontFamily: 'Montserrat',
    },
    h4: {
      fontFamily: 'Montserrat',
    },
    h5: {
      fontFamily: 'Montserrat',
    },
    h6: {
      fontFamily: 'Montserrat',
    },
    subtitle1: {
      fontFamily: 'Montserrat',
    },
    subtitle2: {
      fontFamily: 'Montserrat',
    },
    body1: {
      fontFamily: 'Montserrat',
    },
    body2: {
      fontFamily: 'Montserrat',
    },
    button: {
      fontFamily: 'Montserrat',
    },
    caption: {
      fontFamily: 'Montserrat',
    },
    overline: {
      fontFamily: 'Montserrat',
    },
  },
  components:{
    MuiTab:{
      styleOverrides:{
        textColorPrimary:{
          color:'#666'
        }
      }
    }
  }
});

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);