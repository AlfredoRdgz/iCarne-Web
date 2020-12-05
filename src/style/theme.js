import { createMuiTheme } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#C34D45',
      main: '#C34D45',
      dark: '#C34D45',
      contrastText: '#fff',
    },
    secondary: {
      light: '#C34D45',
      main: '#C34D45',
      dark: '#C34D45',
      contrastText: '#fff',
    },
    tertiary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000',
    },
    fourth: {
      light: '#f5f5f5',
      main: '#f5f5f5',
      dark: '#f5f5f5',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'SF Pro'
  }
}, esES);

export default theme;