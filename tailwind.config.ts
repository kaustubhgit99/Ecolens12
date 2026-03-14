import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-base": "#0B1120",
        surface: "#111827",
        surface2: "#1A2436",
        surface3: "#243046",
        border: "#1E2D42",
        border2: "#2D3F57",
        primary: "#22C55E",
        "primary-dark": "#16A34A",
        "primary-bg": "#0D2818",
        "priority-high": "#EF4444",
        "priority-medium": "#F59E0B",
        "priority-low": "#3B82F6",
        "coin-gold": "#F59E0B",
        "text-primary": "#F0F4FF",
        "text-muted": "#8B9BB4",
        "text-dim": "#546178",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
