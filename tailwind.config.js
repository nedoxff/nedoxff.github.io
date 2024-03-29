const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
				bitter: ['Bitter'],
				mono: ['JetBrains Mono']
			},
			transitionTimingFunction: {
				'in-out-quad': 'cubic-bezier( 0.455,  0.030,  0.515,  0.955 )'
			},
			colors: {
				dark: '#101010',
				light: '#FFFFFF'
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
