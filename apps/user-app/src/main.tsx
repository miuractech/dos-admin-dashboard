import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store/store';
import App from './app/app';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


export const theme = createTheme({
  palette: {
    // type: 'light',
    primary: {
      main: '#161C33',
    },
    secondary: {
      main: '#FF002E',
    },
    error: {
      main: '#bd5857',
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
});

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst >
        <ThemeProvider theme={theme}  >
          {/* <CssBaseline /> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
