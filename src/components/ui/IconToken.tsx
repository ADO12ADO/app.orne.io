import orne from '~/assets/tokens/orne.svg';
import luna from '~/assets/tokens/luna.png';
import astro from '~/assets/tokens/astro.png';

type IconTokenProps = {
	name: 'orne' | 'luna' | 'astro';
	className?: string;
	size?: number;
};

const tokens = {
	orne,
	luna,
	astro,
};

export function IconToken({ name, className, size = 24 }: IconTokenProps) {
	return <img src={tokens[name]} alt={name} className={className} width={size} height={size} />;
}
