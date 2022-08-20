import { styled } from '~/stitches.config';

export const Text = styled('span', {
	color: '$darkGreen',
	fontVariantNumeric: 'tabular-nums',

	defaultVariants: {
		size: 2,
	},

	variants: {
		weight: {
			bold: {
				fontWeight: 'bold',
			},
		},

		size: {
			0: {
				fontSize: '$xs',
			},
			1: {
				fontSize: '$sm',
			},
			2: {
				fontSize: '$base',
			},
			3: {
				fontSize: '$lg',
			},
			4: {
				fontSize: '$xl',
			},
			5: {
				fontSize: '$2xl',
			},
			6: {
				fontSize: '$3xl',
			},
			7: {
				fontSize: '$4xl',
			},
		},
	},
});
