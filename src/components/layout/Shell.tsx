import { ToastBar, Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Shell({ children }: { children: ReactNode }) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="pl-90 flex-1 py-8 pl-[360px] pr-10">
				<Header />
				{children}
			</div>
		</div>
	);
}
