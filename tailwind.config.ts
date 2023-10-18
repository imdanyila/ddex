import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main": "#FFFFFF",
        "second": "#E3E7F3",     
        "accentcolor": "#FB6C6C",
        "bluish": "#3b79de",
        "textcolor": "#9da3ae"
      },
      fontSize: {
        "20px": "20px",
        "45px": "45px",
      },
      backgroundImage: {
        "img": "url('/background.png')",
      },
      spacing: {
        "30px": "30px",
        "25px": "25px",
        "20px": "20px",
        "10px": "10px",
        "5px": "5px",
      },
      boxShadow: {
        "cardxl": '28px 21px 20px 0px #E3E7F3;',
        "button": "2px 2px 2px 0px #E3E7F3"
      },
      borderRadius: {
        "60px": '60px',
        "10px": '10px',

      },
  },},
  plugins: [require("daisyui")],
  daisyui: {
    themes: 
      [{
        mytheme: {
          "primary": "#FFFFFF",
          "secondary": "#3b79de",     
          "accent": "#FB6C6C",    
          "neutral": "#3b79de",
          "base-100": "#ffffff",      
          "info": "#3abff8",      
          "success": "#36d399",      
          "warning": "#fbbd23",      
          "error": "#f87272",
        },},],},
} satisfies Config;