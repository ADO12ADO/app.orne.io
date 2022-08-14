import '@fontsource/ibm-plex-sans';
import { globalCss } from '~/stitches.config';

/**
 * We are using Josh's CSS Reset.
 * @see https://www.joshwcomeau.com/css/custom-css-reset/
 */
export const globalStyles = globalCss({
	'*, *::before, *::after': {
		boxSizing: 'border-box',
	},

	'*': {
		margin: 0,
	},

	'html, body': {
		backgroundColor: '$beige',
		color: '$darkBlue',
		height: '100%',
		scrollbarGutter: 'stable',
	},

	'body': {
		'fontFamily': '$base',
		'lineHeight': 1.5,
		'-webkit-font-smoothing': 'antialiased',
	},

	'img, picture, video, canvas, svg': {
		display: 'block',
		maxWidth: '100%',
	},

	'input, button, select, option': {
		fontFamily: '$base',
		fontSize: '$base',
	},

	'input, button, textarea, select': {
		border: 0,
		font: 'inherit',
	},

	'p, h1, h2, h3, h4, h5, h6': {
		overflowWrap: 'break-word',
	},

	'a': {
		textDecoration: 'none',
	},

	'button': {
		cursor: 'pointer',
	},

	'#app': {
		isolation: 'isolate',
	},
});
