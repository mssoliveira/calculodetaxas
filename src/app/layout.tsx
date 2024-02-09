import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';

export const metadata: Metadata = {
	title: 'Calculo de Taxas',
	description:
		'O calculo de taxas é uma ferramenta gratuita que permite que você calcule as taxas dos principais meios de pagamento do mercado.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className="min-h-screen bg-background font-sans antialiased __className_343187">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="flex min-h-screen flex-col items-center p-24 justify-start">
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
