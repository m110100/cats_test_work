export const theme = {
	colors: {
		blue: {
			1: 'var(--blue-1)',
			2: 'var(--blue-2)',
			contrast: 'var(--blue-contrast)',
		},
		gray: {
			1: 'var(--gray-1)',
			a2: 'var(--gray-a2)',
			a3: 'var(--gray-a3)',
			a4: 'var(--gray-a4)',
		},
	},
	spacing: {
		1: 'var(--spacing-1)',
		2: 'var(--spacing-2)',
	},
	radii: {
		1: 'var(--radius-1)',
	},
	transitions: {
		default: '0.2s ease-in-out',
	},
};
export type Theme = typeof theme;

