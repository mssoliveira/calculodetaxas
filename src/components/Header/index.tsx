import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	return (
		<div className="relative flex place-items-center py-10">
			<Link href={'/'}>
				<Image
					className="relative dark:invert"
					src="/logo.svg"
					alt="Calculo De Taxas"
					width={180}
					height={37}
					priority
				/>
			</Link>
		</div>
	);
}
