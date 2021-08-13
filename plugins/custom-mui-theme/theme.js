import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#e68422',
    },
    secondary: {
      main: '#4c453f',
    },
    footer: {
      main: '#527271'
    }
  },
  typography: {
    fontFamily: 'inherit',
    letterSpacing: 0
  }
});

export default theme;