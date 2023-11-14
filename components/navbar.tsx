'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';

import { ThemeSwitch } from '@/components/theme-switch';
import {
  GithubIcon,
} from '@/components/icons';

import { Logo } from '@/components/icons';
import CustomButton from './custom-button';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <NextUINavbar
      maxWidth='xl'
      classNames={{
        wrapper: 'h-12 md:h-20',
      }}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
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
                // className={clsx(
                // 	linkStyles({ color: "foreground" }),
                // 	"data-[active=true]:text-primary data-[active=true]:font-medium"
                // )}
                // color="foreground"
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
        {session ?
          <Dropdown
            placement='bottom-end'
            radius='sm'
          >
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
          :
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
        }

      </NavbarContent>

      <NavbarContent className='basis-1 pl-4 sm:hidden' justify='end'>
        <ThemeSwitch />
        {session ?
          <Dropdown
            placement='bottom-end'
            radius='sm'
          >
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
          :
          <NavbarItem className='flex'>
            <CustomButton
              color='brand'
              as={Link} href='/auth/signin'
              size='sm'
            >
              Get Started
            </CustomButton>
          </NavbarItem>
        }
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className='top-12'>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href='#'
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
