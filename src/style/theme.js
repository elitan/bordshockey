import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Roboto',
      'sans-serif',
    ],
    useNextVariants: true,
  },
  palette: {
    primary: {
      'main': '#1f89f0',
    },
    secondary: {
      'main': '#E07A5F',
    },
  },
});
