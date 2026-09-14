/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Inter'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        ir: {
          maroon: "#7B1818",
          darkmaroon: "#5c1111",
          gold: "#FFCC00",
          cream: "#F4F4F0", // More distinct off-white
          blue: "#004B87",
        },
        navy: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          lighter: "#334155",
        },
        cream: {
          DEFAULT: "#FDFBF7", // classic cream
          card: "#FFFFFF",
        },
        gold: {
          DEFAULT: "#FFCC00", 
          dark: "#D97706",
          soft: "#FFF3C7",
        },
        forest: {
          DEFAULT: "#16311F",
          light: "#1E4029",
          dark: "#0E2116",
        },
        brand: {
          orange: "#F0501A",
        },
        dept: {
          eng: "#F59E0B",
          snt: "#3B82F6",
          trd: "#8B5CF6",
          merged: "#10B981",
        },
        severity: {
          critical: "#EF4444",
          criticalBg: "#FDECEC",
          major: "#F59E0B",
          majorBg: "#FEF5E6",
          minor: "#64748B",
          minorBg: "#F1F1F3",
        },
        risk: {
          low: "#22c55e",
          moderate: "#eab308",
          high: "#f97316",
          critical: "#ef4444",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 8px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
