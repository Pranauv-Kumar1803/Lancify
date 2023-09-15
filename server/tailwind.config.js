/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    colors: {
      light_green: "#75B2AD",
      gray: "#DCDCDC",
      dark_green: "#4B6666",
      white: "#FFF",
      dark: "#000"
    },
    textColor:{
      light_green: "#75B2AD",
      gray: "#DCDCDC",
      dark_green: "#4B6666",
      white: "#FFF",
      dark: "#000"
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  screens: {
    xs: "480px",
    ss: "620px",
    sm: "768px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  plugins: [],
}

