const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
          colors: {
            white: '#ffffff',
            black: '#1a1a1a',
            red: "#dc2626",
            transparent: 'transparent',
            current: 'currentColor',
            lightBlack : "rgba(0, 0, 0, 0.75);"
          },
        },
    },
    plugins: [],
})