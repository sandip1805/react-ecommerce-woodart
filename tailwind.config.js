const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
          colors: {
            white: "#fff",
            black: '#212121'
          },
        },
    },
    plugins: [],
})