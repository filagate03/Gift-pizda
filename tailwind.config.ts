import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B5FE8",
          dark: "#2E2FA4",
          light: "#9C6BFF"
        },
        accent: "#FF5CA8"
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #1B1D3D 0%, #301A68 50%, #531C85 100%)"
      }
    }
  },
  plugins: []
};

export default config;
