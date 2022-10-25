import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
	variant?: 'fill' | 'outline';
	size?: 'sm' | 'lg';
};

export function Button({ children, variant = 'fill', className, onClick, size = 'lg' }: ButtonProps) {
	const classes = clsx(
		'inline-flex items-center justify-center font-semibold px-4 py-2 border border-transparent rounded-full transition-colors',
		{
			'bg-green text-darkGreen hover:bg-green75': variant === 'fill',
			'text-green border-2 !border-green hover:bg-green hover:text-darkGreen': variant === 'outline',
		},
		{
			'h-8 px-3 text-sm': size === 'sm',
			'h-12 w-full text-base': size === 'lg',
		},
		className
	);

	return <button className={classes}>{children}</button>;
}
