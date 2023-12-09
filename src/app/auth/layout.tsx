'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === 'authenticated') return push('/');
  }, [status, push]);

  return children;
}
export default AuthLayout;
