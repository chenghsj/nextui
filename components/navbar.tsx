'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { useWindowSize } from 'usehooks-ts';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';

import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon } from '@/components/icons';

import { Logo } from '@/components/icons';
import { CustomButton } from './custom-button';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import cn from '@/utils/cn';

export const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NextUINavbar
      maxWidth='xl'
      classNames={{
        wrapper: 'h-14 md:h-20 pl-10',
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarMenuToggle className='lg:hidden' />
        <NavbarBrand as='li' className='max-w-fit gap-3'>
          <NextLink className='flex items-center justify-start gap-1' href='/'>
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <ul className='mx-auto hidden gap-8 lg:flex'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className='font-bold active:text-gray_l2'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden basis-1/5 sm:flex sm:basis-full'
        justify='end'
      >
        <ThemeSwitch />
        {session ? (
          <Dropdown placement='bottom-end' radius='sm'>
            <DropdownTrigger>
              <Avatar
                isBordered
                className='cursor-pointer'
                src={session.user?.image || ''}
                name={session.user?.name || ''}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                className='text-black dark:text-white'
                href={`/candidate/${session.user?.name}`}
                as={Link}
                showDivider
              >
                Profile
              </DropdownItem>
              <DropdownItem onPress={() => signOut()}>Sign out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className='hidden md:flex'>
              <CustomButton
                variant='bordered-brand'
                // className='border-1 border-brand bg-white text-brand dark:border-white dark:bg-transparent dark:text-white'
                as={Link}
              >
                Company Login
              </CustomButton>
            </NavbarItem>
            <NavbarItem className='hidden md:flex'>
              <CustomButton color='brand' as={Link} href='/auth/signin'>
                Get Started
              </CustomButton>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
        <ThemeSwitch />
        {session ? (
          <Dropdown placement='bottom-end' radius='sm'>
            <DropdownTrigger>
              <Avatar
                size='sm'
                isBordered
                className='cursor-pointer'
                src={session.user?.image || ''}
                name={session.user?.name || ''}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                className='text-black dark:text-white'
                href={`/candidate/${session.user?.name}`}
                as={Link}
                showDivider
              >
                Profile
              </DropdownItem>
              <DropdownItem onPress={() => signOut()}>Sign out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem className='flex'>
            <CustomButton color='brand' as={Link} href='/auth/signin' size='sm'>
              Get Started
            </CustomButton>
          </NavbarItem>
        )}
      </NavbarContent>

      <div
        className={cn(
          'absolute left-0 top-[3.5rem] w-screen list-none bg-white opacity-95 transition-height md:top-[5rem]',
          `${isMenuOpen ? `h-[100dvh]` : 'h-0'}`
        )}
      />
      <div
        className={cn(
          'absolute top-[4rem] mx-4 mt-2 flex w-screen flex-col gap-2 md:top-[5.5rem]',
          `${isMenuOpen ? `visible` : 'invisible'}`
        )}
      >
        {siteConfig.navMenuItems.map((item, index) => (
          <Link
            key={`${item}-${index}`}
            color={index === siteConfig.navMenuItems.length - 1
              ? 'danger'
              : 'primary'
            }
            href='#'
            size='lg'
          >
            {item.label}
          </Link>
        ))}
      </div>
    </NextUINavbar>
  );
};
