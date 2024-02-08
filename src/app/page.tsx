import Header from '@/components/Header';
import { navMenu } from '@/data/menu';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24 justify-start">
			<Header />
			<div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
				{navMenu.map((item, index) => (
					<a
						key={index}
						href={item.href}
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
						rel="noopener noreferrer"
					>
						<h2 className={`mb-3 text-2xl font-semibold`}>
							{item.name + ' '}
							<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
								-&gt;
							</span>
						</h2>
						<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
							{item.description}
						</p>
					</a>
				))}
			</div>
		</main>
	);
}
