import { Dialog, Page, Checkbox } from 'konsta/react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Confetti } from '../components';

const Wheel = dynamic(
	() => import('../components/Roulette').then((mod) => mod.Wheel),
	{ ssr: false, loading: () => <span>Loading</span> }
);

export default function Home() {
	const [spinData, setspinData] = useState<SpinData>({
		start: false,
		data: [],
		removeWhenSelected: false,
		winner: 0,
		inputValue: '',
		showConfetti: false,
		dialog: {
			message: 'TEAM BETA 02',
			opened: false,
		},
	});

	const onSpinStop = () => {
		let tempdata: { option: string }[] = [],
			text = '';
		if (spinData.removeWhenSelected) {
			spinData.data.map((x, i) => {
				if (i !== spinData.winner) {
					text += `${x.option}\n`;
					tempdata.push({
						option: x.option,
					});
				}
			});
		}

		setspinData({
			...spinData,
			data: spinData.removeWhenSelected ? tempdata : spinData.data,
			showConfetti: true,
			start: false,
			inputValue: spinData.removeWhenSelected ? text : spinData.inputValue,
			dialog: {
				message: spinData.data[spinData.winner].option,
				opened: true,
			},
		});
	};

	const onSpinStart = () => {
		if (spinData.data.length > 0) {
			const INDEX = Math.floor(Math.random() * spinData.data.length);
			setspinData({ ...spinData, start: true, winner: INDEX });
		}
	};

	const oninputData = (e: any) => {
		const text = e.target.value.split('\n');
		let data: { option: string }[] = [];
		text.map((x: string) => {
			if (x) data.push({ option: x });
		});
		setspinData({ ...spinData, data: data, inputValue: e.target.value });
	};

	return (
		<>
			<Head>
				<title>$REKT SpinTheWheel</title>
			</Head>
			<header className='flex w-full bg-[#222222] py-2 px-2 w-100'>
				<div className='ml-2'>
					<div className='flex -ml-1 items-center justify-center gap-2 font-bold uppercase'>
						<span className='hidden rotate-180 bg-clip-text text-4xl text-transparent outline-none [-webkit-text-stroke-width:1px] [background-image:linear-gradient(90deg,#34fcea,#b4fc32)]'>
							r
						</span>
						<span className='bg-clip-text text-2xl tracking-wide text-transparent outline-none [-webkit-text-stroke-width:1px] [background-image:linear-gradient(90deg,#eb85b5,#d13834)]'>
							<span className='text-white'>$</span>ꓤEKT
						</span>
					</div>
				</div>
			</header>

			<div className='flex flex-col lg:flex-col xl:flex-row gap-12 justify-between items-center bg-[#1a1a1a] h-screen w-full overflow-x-hidden'>
				{/* SELECTOR CONTAINER */}
				<div
					className='relative flex justify-center items-center w-full h-full'
					onClick={onSpinStart}
				>
					{/* WHEEL CONTAINER */}
					<div className='relative flex justify-start' onClick={onSpinStart}>
						<div
							onClick={onSpinStart}
							className='absolute h-full w-full z-20 flex justify-center items-center'
						>
							<img
								className='object-contain h-20 md:h-40 rounded-full'
								alt='image'
								src='/pink-guy.jpg'
							/>
						</div>
						<div className='w-full h-full [transform:rotate(38deg)]'>
							<Wheel
								radiusLineWidth={1}
								mustStartSpinning={spinData.start}
								prizeNumber={spinData.winner}
								data={spinData.data}
								fontSize={spinData.data?.length > 50 ? 7 : 15}
								backgroundColors={['#fa2b32', '#ed85b8']}
								textColors={['#fff', '#000']}
								textDistance={spinData.data?.length > 50 ? 70 : 60}
								spinDuration={0.9}
								onStopSpinning={onSpinStop}
							/>
						</div>
					</div>
					<div className='absolute h-full w-full z-30 flex justify-end items-center md:pr-[30vw] lg:pr-[10vw] xl:pr-[15vw]'>
						<img
							className='object-contain h-16 sm:h-20 md:h-28 lg:h-40 xl:h-56 rounded-full pt-2 sm:pt-4 md:pt-6 lg:pt-8'
							alt='image'
							src='/rekt-guy.png'
						/>
					</div>
				</div>
				{/* TEXTAREA CONTAINER */}
				<div className='p-6 md:block h-full'>
					<div className='flex gap-2 pb-4'>
						<Checkbox
							className=' k-color-[#ec84b7]'
							checked={spinData.removeWhenSelected}
							onChange={() =>
								setspinData({
									...spinData,
									removeWhenSelected: !spinData.removeWhenSelected,
								})
							}
						/>
						<span className='text-sm selection:bg-transparent text-zinc-300'>
							Remove Instance when selected
						</span>
					</div>
					<textarea
						value={spinData.inputValue}
						className='rounded-lg text-xl xl:text-2xl resize-none bg-[#222222] border-md-dark-surface-1 border w-full h-full px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-offset-2 text-zinc-300 focus:ring-offset-md-dark-surface-1 focus:ring-[#ec84b7]'
						onInput={oninputData}
					/>
				</div>
			</div>

			<Confetti
				enable={spinData.showConfetti}
				toggle={() =>
					setspinData({
						...spinData,
						showConfetti: false,
						dialog: { ...spinData.dialog, opened: false },
					})
				}
			/>
			<Dialog
				onBackdropClick={() =>
					setspinData({
						...spinData,
						showConfetti: false,
						dialog: { ...spinData.dialog, opened: false },
					})
				}
				opened={spinData.dialog.opened}
				content={
					<div className='text-4xl text-center'>{spinData.dialog.message}</div>
				}
				className='bg-[#ED85B8] z-[100]'
				colors={{
					bgMaterial: '',
				}}
			/>
		</>
	);
}
