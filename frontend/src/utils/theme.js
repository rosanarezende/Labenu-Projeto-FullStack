import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export default createMuiTheme(
  {
    "palette":
    {
      "common": {
        "black": "#000",
        "white": "#fff"
      },
      "background": {
        "paper": "#fff",
        "default": "#fafafa"
      },
      "primary": {
        "light": "rgba(44, 94, 146, 0.74)",
        "main": "rgba(44, 94, 146, 1)",
        "dark": "rgba(30, 50, 100, 1)",
        "contrastText": "#fff"
      },
      "secondary": {
        "light": "rgba(30, 215, 96, 0.7)",
        "main": "rgba(30, 215, 96, 1)",
        "dark": "rgba(29, 185, 84, 1)",
        "contrastText": "#fff"
      },
      "error": {
        "light": "#e57373",
        "main": "#f44336",
        "dark": "#d32f2f",
        "contrastText": "#fff"
      },
      "text": {
        "primary": "rgba(0, 0, 0, 0.87)",
        "secondary": "rgba(0, 0, 0, 0.54)",
        "disabled": "rgba(0, 0, 0, 0.38)",
        "hint": "rgba(0, 0, 0, 0.38)"
      }
    }
  }
);

export const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));