import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        fontSecondary: "var(--color-font-secondary)",
        fontLightPrimary: "var(--color-font-light-primary)",
        fontBasePrimary: "var(--color-font-base-primary)",
        fontPrimary: "var(--color-font-primary)",
        fontPlaceholder: "var(--color-font-placeholder)",
        basePrimary: "var(--color-base-primary)",
        fontBorder: "var(--color-font-input-border)",
        fontDanger: "var(--color-font-danger)",
        fontSuccess: "var(--color-font-success)",
        fontInputLabel: "var(--color-font-input-label)",
      },
      backgroundColor: {
        primary: "var(--color-primary)",
        lightPrimary: "var(--color-light-primary)",
        secondary: "var(--color-secondary)",
        borderPrimary: "var(--color-border-primary)",
        fontPrimary: "var(--color-font-primary)",
        basePrimary: "var(--color-base-primary)",
        danger: "var(--color-font-danger)",
        dangerLight: "var(--color-font-danger-light)",
        successLight: "var(--color-font-success-light)",
        lightBasePrimary: "var(--color-light-base-primary)",
        baseSecondary: "var(--color-base-secondary)",
      },
      borderColor: {
        lightPrimary: "var(--color-font-light-primary)",
        themePrimary: "var(--color-font-primary)",
        primary: "var(--color-primary)",
        secondary: "var(--color-border-secondary)",
        baseSecondary: "var(--color-base-secondary)",
      },
      screens: {
        "3xl": "1770px",
      },
      fontSize: {
        xxs: "0.5rem",
        xs: "0.625rem",
        sm: "0.75rem",
        base: "0.875rem",
        xl: "1rem",
        "2xl": "1.125rem",
        "3xl": "1.250rem",
        "4xl": "1.375rem",
        "5xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
