import Image from 'next/image';
import Link from 'next/link';
import * as Icon from '@radix-ui/react-icons';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import ThemeColorMode from '../DarkMode';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 hidden md:flex">
					<Link
						href={'/'}
						passHref
						className="flex col-start-1 justify-center items-center mr-4"
					>
						<Image
							className="relative dark:invert"
							src="/logo.svg"
							alt="Calculo De Taxas"
							width={27}
							height={100}
							priority
						/>
						<span className="hidden ml-4 font-bold sm:inline-block">
							Calculo de Taxas
						</span>
					</Link>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<Link href="/" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle}
									>
										Home
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<Button variant="outline" size="icon" asChild>
						<Link
							href="https://github.com/mssoliveira"
							target="_blank"
						>
							<Icon.GitHubLogoIcon className="h-4 w-4" />
						</Link>
					</Button>
					<Button variant="outline" size="icon" asChild>
						<Link
							href="https://twitter.com/mauricinsouza"
							target="_blank"
						>
							<Icon.TwitterLogoIcon className="h-4 w-4" />
						</Link>
					</Button>
					<ThemeColorMode />
				</div>
			</div>
		</header>
	);
}
