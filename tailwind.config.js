module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626",
          surface: "#F3F4F6",
          "surface-light": "#F5F5F5",
        },
      },
    },
  },
};
