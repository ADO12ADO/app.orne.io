import { Text } from '~/components/ui';
import type { ReactNode } from 'react';

export function PageTitle({ children }: { children: ReactNode }) {
	return (
		<Text as={'h1'} size={6} css={{ marginBottom: '$4' }}>
			{children}
		</Text>
	);
}
