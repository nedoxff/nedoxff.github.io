const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			},
			transitionTimingFunction: {
				'in-out-quad': 'cubic-bezier( 0.455,  0.030,  0.515,  0.955 )'
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
