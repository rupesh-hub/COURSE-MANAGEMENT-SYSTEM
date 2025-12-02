/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core
        background: "#f8f9fa", // light gray background
        foreground: "#1e293b", // main text color

        card: "#ffffff",
        "card-foreground": "#1e293b",

        popover: "#ffffff",
        "popover-foreground": "#1e293b",

        // Primary & secondary
        primary: "#3b82f6", // blue
        "primary-foreground": "#ffffff",

        secondary: "#6366f1", // indigo
        "secondary-foreground": "#ffffff",

        accent: "#8b5cf6", // purple
        "accent-foreground": "#ffffff",

        destructive: "#ef4444", // red
        "destructive-foreground": "#ffffff",

        muted: "#f1f5f9",
        "muted-foreground": "#64748b",

        border: "#e2e8f0",
        input: "#ffffff",
        ring: "#3b82f6",

        // Extra colors
        cream: "#ffffff",
        sage: "#a1bc98",
        "sage-light": "#d2dcb6",
        "sage-dark": "#778873",

        // Sidebar
        sidebar: "#f8fafc",
        "sidebar-foreground": "#1e293b",
        "sidebar-primary": "#3b82f6",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#e0e7ff",
        "sidebar-accent-foreground": "#1e293b",
        "sidebar-border": "#e2e8f0",
        "sidebar-ring": "#6366f1",

        // Charts
        "chart-1": "#3b82f6",
        "chart-2": "#6366f1",
        "chart-3": "#8b5cf6",
        "chart-4": "#f97316",
        "chart-5": "#10b981",
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
      },

      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
