import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme(
  {
    "palette": {

      "common": {
        "black": "#000",
        "white": "#fff"
      },

      "background": {
        "paper": "#fff",
        "default": "#fafafa"
      },

      "primary": {
        "light": "rgba(163, 215, 255, 1)",
        "main": "rgba(0, 121, 211, 0.87)",
        "dark": "rgba(23, 28, 153, 1)",
        "contrastText": "#fff"
      },

      "secondary": {
        "light": "#ff4081",
        "main": "#f50057",
        "dark": "#c51162",
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