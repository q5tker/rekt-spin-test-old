import { useCallback } from 'react';
import Particles from 'react-particles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import Image from 'next/image';

export default function Confetti({
	enable,
	toggle,
}: {
	enable: boolean;
	toggle: () => void;
}) {
	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine);
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			await console.log(container);
		},
		[]
	);

	return (
		<>
			<Image
				alt='Flowing blood'
				width={1000}
				height={700}
				src='/blood.gif'
				className={`absolute top-0 w-full h-full z-[98] ${
					!enable && 'hidden'
				} outline outline-white`}
				onClick={() => toggle()}
			/>
		</>
	);
}
