import type { Config } from "tailwindcss";
import tailwindcssFilters from 'tailwindcss-filters';

export default {
    content: [
        "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
        './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                'boxShadowMoon': '-1px -1px 19px #fff, -1px -1px 19px #fff',
            },
            filter: {
                'filter-moon': 'brightness(0.5)'
            },

            filterMoon: { 'brightness-50': 'brightness(0.5)', },
            colors: {
                customGray: '#ddd',
                customGrayTableHead: '#818181',
                customGrayText: '#595959',
                blackTranparent: '#00000030',

            },
            fontSize: {
                'custom-small': '0.8rem',
            },
            fontFamily: {
                custom: ['for-shift'],
                sans: [
                    '"Inter"',
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    plugins: [tailwindcssFilters],
} satisfies Config;