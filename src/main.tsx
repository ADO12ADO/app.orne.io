import React from 'react';
import { createRoot } from 'react-dom/client';
import { Application } from '~/Application';

createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Application />
	</React.StrictMode>
);
