import '@/styles/globals.css';
import { ReactElement } from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import {
  TwitterIcon,
  DiscordIcon,
  GithubIcon,
  LogoFooter,
} from '@/components/icons';
import { Session, getServerSession } from 'next-auth';

export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: true,
  manifest: "/manifest.json"
};

type IRootLayout = {
  children: ReactElement;
};

export default async function RootLayout({ children }: IRootLayout) {
  const session = (await getServerSession()) as Session;

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          session={session}
          themeProps={{ attribute: 'class', defaultTheme: 'light' }}
        >
          <div className='flex min-h-screen flex-col justify-between overflow-auto'>
            <Navbar />
            <main className='h-fit w-full'>{children}</main>
            <footer className='w-full bg-gray_b p-4 dark:bg-gray_l4 md:px-[120px] md:py-10'>
              <div className='flex items-center justify-between border-b-gray_l1 md:border-t-[0.5px] md:py-5'>
                <div>
                  <LogoFooter className='w-40 md:w-[200px]' />
                  <span className='text-sm italic text-gray_l1'>
                    © 2024 Lorem ipsum dolor sit amet
                  </span>
                </div>
                <div className='flex gap-x-3'>
                  <Link
                    isExternal
                    href={siteConfig.links.twitter}
                    aria-label='Twitter'
                  >
                    <TwitterIcon className='text-white' />
                  </Link>
                  <Link
                    isExternal
                    href={siteConfig.links.discord}
                    aria-label='Discord'
                  >
                    <DiscordIcon className='text-white' />
                  </Link>
                  <Link
                    isExternal
                    href={siteConfig.links.github}
                    aria-label='Github'
                  >
                    <GithubIcon className='text-white' />
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
