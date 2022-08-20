import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
export type CSS = Stitches.CSS<typeof config>;
export type { VariantProps } from '@stitches/react';

export const { styled, css, config, keyframes, globalCss } = createStitches({
	theme: {
		colors: {
			white: 'hsl(0, 0%, 100%)',
			offWhite: 'hsl(20, 33%, 98%)',
			beige: 'hsl(26, 21%, 94%)',
			mediumGrey: 'hsl(230, 21%, 65%)',
			green: 'hsl(114, 31%, 63%)',
			green25: 'hsla(114, 31%, 63%, 0.25)',
			green50: 'hsla(114, 31%, 63%, 0.5)',
			darkGreen: 'hsl(114, 52%, 20%)',
			blue: 'hsl(216, 54%, 56%)',
			darkBlue: 'hsl(230, 24%, 29%)',
			darkBlue50: 'hsla(230, 24%, 29%, 0.5)',
			darkBlue75: 'hsla(230, 24%, 29%, 0.75)',
			orange: 'hsl(24, 91%, 65%)',
		},
		space: {
			0: 0,
			px: '1px',
			1: '4px',
			2: '8px',
			3: '12px',
			4: '16px',
			5: '20px',
			6: '24px',
			7: '28px',
			8: '32px',
			9: '36px',
			10: '40px',
			11: '44px',
			12: '48px',
			14: '56px',
		},
		fontSizes: {
			'xs': '0.75rem', // 12px
			'sm': '0.875rem', // 14px
			'base': '1rem', // 16px
			'lg': '1.125rem', // 18px
			'xl': '1.25rem', // 20px
			'2xl': '1.5rem', // 24px
			'3xl': '2.25rem', // 36px
			'4xl': '3rem', // 48px
		},
		fonts: {
			base: '"IBM Plex Sans", -apple-system, sans-serif',
		},
		radii: {
			rounded: '8px',
		},
		sizes: {
			maxContainer: '1200px',
		},
		shadows: {
			base: '0 5px 5px -5px rgba(73, 114, 68, 0.1)',
		},
		utils: {
			m: (value: string) => ({
				margin: value,
			}),
			mt: (value: string) => ({
				marginTop: value,
			}),
			mr: (value: string) => ({
				marginRight: value,
			}),
			mb: (value: string) => ({
				marginBottom: value,
			}),
			ml: (value: string) => ({
				marginLeft: value,
			}),
			mx: (value: string) => ({
				marginInline: value,
			}),
			my: (value: string) => ({
				marginBlock: value,
			}),

			p: (value: string) => ({
				padding: value,
			}),
			pt: (value: string) => ({
				paddingTop: value,
			}),
			pr: (value: string) => ({
				paddingRight: value,
			}),
			pb: (value: string) => ({
				paddingBottom: value,
			}),
			pl: (value: string) => ({
				paddingLeft: value,
			}),
			px: (value: string) => ({
				paddingInline: value,
			}),
			py: (value: string) => ({
				paddingBlock: value,
			}),
		},
	},
});
