import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="grid h-screen place-content-center px-4">
			<div className="text-center">
				<h1 className="text-9xl font-black text-white">404</h1>

				<p className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
					Uh-oh!
				</p>

				<p className="mt-4 text-white">
					Não conseguimos encontrar essa página.
				</p>

				<Link
					href={'/'}
					className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
				>
					Volte para Home
				</Link>
			</div>
		</div>
	);
}
