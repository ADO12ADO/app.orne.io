import { useState, useEffect } from 'react';

export function useCountdown(to: Date) {
	const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	useEffect(() => {
		const interval = setInterval(() => {
			const timeLeft = to.getTime() - new Date().getTime();

			const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

			setTimeLeft(timeLeft > 0 ? { days, hours, minutes, seconds } : { days: 0, hours: 0, minutes: 0, seconds: 0 });
		}, 1000);

		return () => clearInterval(interval);
	}, [to]);

	return timeLeft;
}
