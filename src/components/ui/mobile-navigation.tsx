'use client';
import { MobileDrawer } from './drawer';
import { signOut, useSession } from 'next-auth/react';
import { Bookmark, Home } from 'lucide-react';

function MobileNavigation() {
  const { status, data } = useSession();

  const MENU_ITEMS = [
    {
      label: 'Home',
      link: '/',
      icon: <Home />,
    },
    {
      label: 'Saved Posts',
      link: '/saved/' + data?.user?.id,
      icon: <Bookmark />,
    },
  ];

  if (status === 'loading') return null;

  return (
    <div className='max-sm:block hidden'>
      <MobileDrawer
        handleLogOut={signOut}
        status={status}
        user={data?.user}
        MENU_ITEMS={MENU_ITEMS}
      />
    </div>
  );
}

export default MobileNavigation;
