'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { TanstackQueryProvider } from './tanstack-query-provider';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session?: Session;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  return (
    <TanstackQueryProvider>
      <SessionProvider session={session}>
        <NextUIProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </TanstackQueryProvider>
  );
}
