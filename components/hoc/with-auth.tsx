'use client';

import { useRouter } from 'next/navigation';
import { SessionContextValue, useSession } from 'next-auth/react';
import { PickAndRename } from '@/types';

export type ISessionValue = PickAndRename<SessionContextValue, { data: 'session'; }>;

export const withAuth = <P extends {}>(
  Component: React.ComponentType<P & ISessionValue>
): React.FC<P> => {
  const Auth: React.FC<P> = (props) => {
    const router = useRouter();
    const session = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/auth/signin');
      },
    });

    if (!session.data) return null;

    return <Component session={session.data} {...props} />;
  };

  return Auth;
};